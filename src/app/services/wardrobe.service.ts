import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { OUTFIT_LOG_MOCK_DATA } from '../data/outfit.mock-data';
import { WARDROBE_MOCK_DATA } from '../data/wardrobe.mock-data';
import { CreateWardrobeItem } from '../models/create-wardrobe-item.model';
import { DashboardStats } from '../models/dashboard-stats.model';
import { OutfitEntry, OutfitEntryDetails } from '../models/outfit-entry.model';
import { WardrobeItem } from '../models/wardrobe-item.model';

@Injectable({
  providedIn: 'root',
})
export class WardrobeService {
  private items: WardrobeItem[] = WARDROBE_MOCK_DATA.map((item) => ({ ...item }));
  private outfitEntries: OutfitEntry[] = OUTFIT_LOG_MOCK_DATA.map((entry) => ({
    ...entry,
    itemIds: [...entry.itemIds],
  }));

  private itemsSubject = new BehaviorSubject<WardrobeItem[]>(this.items);
  private outfitEntriesSubject = new BehaviorSubject<OutfitEntry[]>(this.outfitEntries);

  private currentWeather = {
    city: 'Brasov',
    temperature: 25,
    condition: 'Sunny',
  } as const;

  readonly items$ = this.itemsSubject.asObservable();
  readonly outfitEntries$ = this.outfitEntriesSubject.asObservable();

  getWardrobeItems(): Observable<WardrobeItem[]> {
    return this.items$;
  }

  getRecentItems(limit = 5): Observable<WardrobeItem[]> {
    return this.items$.pipe(map((items) => this.sortRecentItems(items).slice(0, limit)));
  }

  getOutfitEntries(): Observable<OutfitEntry[]> {
    return this.outfitEntries$;
  }

  getOutfitEntriesWithItems(): Observable<OutfitEntryDetails[]> {
    return combineLatest([this.items$, this.outfitEntries$]).pipe(
      map(([items, entries]) =>
        entries.map((entry) => ({
          ...entry,
          items: entry.itemIds
            .map((itemId) => items.find((item) => item.id === itemId))
            .filter((item): item is WardrobeItem => !!item),
        }))
      )
    );
  }

  getCurrentWeather() {
    return this.currentWeather;
  }

  suggestOutfitBundle(items: WardrobeItem[] = this.items): WardrobeItem[] {
    const available = items.filter((item) => item.availability === 'Available');

    const chooseItem = (
      categories: string[],
      excluded: Set<string> = new Set()
    ): WardrobeItem | null => {
      return (
        available
          .filter((item) => categories.includes(item.category) && !excluded.has(item.id))
          .sort((a, b) => a.wearCount - b.wearCount || (a.lastWornDate ?? 0) - (b.lastWornDate ?? 0))[0] || null
      );
    };

    const selectedIds = new Set<string>();
    const outfit: WardrobeItem[] = [];

    const dress = chooseItem(['Dresses']);
    if (dress) {
      outfit.push(dress);
      selectedIds.add(dress.id);
    }

    const top = chooseItem(['Tops', 'Outerwear', 'Knitwear'], selectedIds);
    const bottom = chooseItem(['Bottoms'], selectedIds);
    const shoes = chooseItem(['Shoes'], selectedIds);

    if (!dress) {
      if (top) {
        outfit.push(top);
        selectedIds.add(top.id);
      }
      if (bottom) {
        outfit.push(bottom);
        selectedIds.add(bottom.id);
      }
      if (shoes) {
        outfit.push(shoes);
        selectedIds.add(shoes.id);
      }
    } else if (shoes) {
      outfit.push(shoes);
      selectedIds.add(shoes.id);
    }

    const fallback = available
      .filter((item) => !selectedIds.has(item.id))
      .sort((a, b) => a.wearCount - b.wearCount || (a.lastWornDate ?? 0) - (b.lastWornDate ?? 0))
      .slice(0, Math.max(0, 3 - outfit.length));

    return [...outfit, ...fallback];
  }

  getDashboardStats(): Observable<DashboardStats> {
    return combineLatest([this.items$, this.outfitEntries$]).pipe(
      map(([items, entries]) => ({
        snapStreak: this.calculateSnapStreak(entries),
        mostWornStyle: this.calculateMostWornStyle(items),
        newInCount: this.calculateNewInCount(items),
        weather: this.currentWeather,
      }))
    );
  }

  addWardrobeItem(item: CreateWardrobeItem): Observable<WardrobeItem[]> {
    const wardrobeItem: WardrobeItem = {
      id: crypto.randomUUID(),
      availability: 'Available',
      wearCount: 0,
      lastWornLabel: 'Just added',
      addedAt: Date.now(),
      isFavorite: false,
      ...item,
    };

    this.items = [wardrobeItem, ...this.items];
    return this.refreshAndReturn();
  }

  toggleFavorite(itemId: string): Observable<WardrobeItem[]> {
    this.items = this.items.map((item) =>
      item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
    );

    return this.refreshAndReturn();
  }

  removeWardrobeItem(itemId: string): Observable<WardrobeItem[]> {
    this.items = this.items.filter((item) => item.id !== itemId);
    return this.refreshAndReturn();
  }

  toggleAvailability(itemId: string): Observable<WardrobeItem[]> {
    this.items = this.items.map((item) =>
      item.id === itemId
        ? { ...item, availability: item.availability === 'Available' ? 'Laundry' : 'Available' }
        : item
    );

    return this.refreshAndReturn();
  }

  markAsWorn(itemId: string): Observable<WardrobeItem[]> {
    this.items = this.items.map((item) =>
      item.id === itemId
        ? {
          ...item,
          wearCount: item.wearCount + 1,
          lastWornDate: Date.now(),
          lastWornLabel: 'Today',
        }
        : item
    );

    return this.refreshAndReturn();
  }

  private refreshAndReturn(): Observable<WardrobeItem[]> {
    this.itemsSubject.next(this.items);
    return this.items$;
  }

  private sortRecentItems(items: WardrobeItem[]): WardrobeItem[] {
    return [...items]
      .filter((item) => !!item.lastWornDate)
      .sort((a, b) => (b.lastWornDate ?? 0) - (a.lastWornDate ?? 0));
  }

  private calculateSnapStreak(entries: OutfitEntry[]): number {
    const daysWithUploads = new Set(entries.map((entry) => this.toDateKey(entry.date)));
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let streak = 0;

    while (daysWithUploads.has(this.toDateKey(currentDate))) {
      streak += 1;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  }

  private calculateMostWornStyle(items: WardrobeItem[]): string {
    if (items.length === 0) {
      return 'No data';
    }

    const styleTotals = new Map<string, number>();

    for (const item of items) {
      const currentTotal = styleTotals.get(item.style) ?? 0;
      styleTotals.set(item.style, currentTotal + item.wearCount);
    }

    return [...styleTotals.entries()].sort((a, b) => b[1] - a[1])[0][0];
  }

  private calculateNewInCount(items: WardrobeItem[]): number {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return items.filter((item) => item.addedAt >= thirtyDaysAgo).length;
  }

  private toDateKey(dateValue: Date | string): string {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : new Date(dateValue);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
