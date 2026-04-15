import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClothingCardComponent } from '../../components/clothing-card/clothing-card.component';
import { DashboardStatsComponent } from '../../components/dashboard-stats/dashboard-stats.component';
import { HorizontalCarouselComponent } from '../../components/horizontal-carousel/horizontal-carousel.component';
import { OutfitCalendarComponent } from '../../components/outfit-calendar/outfit-calendar.component';
import { TodayActionComponent } from '../../components/today-action/today-action.component';
import { DashboardStats } from '../../models/dashboard-stats.model';
import { OutfitEntryDetails } from '../../models/outfit-entry.model';
import { WardrobeItem } from '../../models/wardrobe-item.model';
import { WardrobeService } from '../../services/wardrobe.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    ClothingCardComponent,
    DashboardStatsComponent,
    HorizontalCarouselComponent,
    OutfitCalendarComponent,
    TodayActionComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  items: WardrobeItem[] = [];
  recentItems: WardrobeItem[] = [];
  stats: DashboardStats | null = null;
  outfitEntries: OutfitEntryDetails[] = [];

  constructor(private readonly wardrobeService: WardrobeService) {}

  ngOnInit(): void {
    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.items = items;
    });

    this.wardrobeService.getRecentItems().subscribe((items) => {
      this.recentItems = items;
    });

    this.wardrobeService.getDashboardStats().subscribe((stats) => {
      this.stats = stats;
    });

    this.wardrobeService.getOutfitEntriesWithItems().subscribe((entries) => {
      this.outfitEntries = entries;
    });
  }

  trackByItemId(_: number, item: WardrobeItem): string {
    return item.id;
  }

  toggleFavorite(itemId: string): void {
    this.wardrobeService.toggleFavorite(itemId).subscribe();
  }

  removeItem(itemId: string): void {
    this.wardrobeService.removeWardrobeItem(itemId).subscribe();
  }

  markAsWorn(itemId: string): void {
    this.wardrobeService.markAsWorn(itemId).subscribe();
  }
}
