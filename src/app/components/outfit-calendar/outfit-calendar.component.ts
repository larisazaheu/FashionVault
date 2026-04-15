import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutfitEntryDetails } from '../../models/outfit-entry.model';
import { OutfitDayOverlayComponent } from '../outfit-day-overlay/outfit-day-overlay.component';

interface CalendarDay {
  key: string;
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  outfit: OutfitEntryDetails | null;
}

@Component({
  selector: 'app-outfit-calendar',
  standalone: true,
  imports: [CommonModule, OutfitDayOverlayComponent],
  templateUrl: './outfit-calendar.component.html',
  styleUrl: './outfit-calendar.component.css',
})
export class OutfitCalendarComponent implements OnChanges {
  @Input() outfits: OutfitEntryDetails[] = [];

  readonly weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  currentMonth = new Date();
  selectedOutfit: OutfitEntryDetails | null = null;

  private readonly monthFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  });
  private readonly dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['outfits']) {
      this.selectDefaultOutfit();
    }
  }

  get monthLabel(): string {
    return this.monthFormatter.format(this.currentMonth);
  }

  get selectedDateLabel(): string {
    if (!this.selectedOutfit) {
      return '';
    }

    return this.dateFormatter.format(new Date(this.selectedOutfit.date));
  }

  get calendarDays(): CalendarDay[] {
    const firstDayOfMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1
    );
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
    const firstGridDate = new Date(firstDayOfMonth);
    firstGridDate.setDate(firstGridDate.getDate() - startOffset);

    const outfitsByDay = new Map(
      this.outfits.map((outfit) => [this.toDateKey(new Date(outfit.date)), outfit])
    );
    const selectedKey = this.selectedOutfit ? this.toDateKey(new Date(this.selectedOutfit.date)) : '';
    const todayKey = this.toDateKey(new Date());

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(firstGridDate);
      date.setDate(firstGridDate.getDate() + index);

      const key = this.toDateKey(date);

      return {
        key,
        date,
        dayNumber: date.getDate(),
        isCurrentMonth: date.getMonth() === this.currentMonth.getMonth(),
        isToday: key === todayKey,
        isSelected: key === selectedKey,
        outfit: outfitsByDay.get(key) ?? null,
      };
    });
  }

  trackByDate(_: number, day: CalendarDay): string {
    return day.key;
  }

  showPreviousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.selectDefaultOutfit();
  }

  showNextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.selectDefaultOutfit();
  }

  selectDay(day: CalendarDay): void {
    this.selectedOutfit = day.outfit;
  }

  clearSelection(): void {
    this.selectedOutfit = null;
  }

  private selectDefaultOutfit(): void {
    const currentMonthOutfits = this.outfits.filter((outfit) => {
      const outfitDate = new Date(outfit.date);
      return (
        outfitDate.getFullYear() === this.currentMonth.getFullYear() &&
        outfitDate.getMonth() === this.currentMonth.getMonth()
      );
    });

    this.selectedOutfit = currentMonthOutfits.find((outfit) => this.isToday(outfit.date)) ?? null;
  }

  private isToday(dateValue: string): boolean {
    return this.toDateKey(new Date(dateValue)) === this.toDateKey(new Date());
  }

  private toDateKey(date: Date): string {
    const normalizedDate = new Date(date);
    const year = normalizedDate.getFullYear();
    const month = String(normalizedDate.getMonth() + 1).padStart(2, '0');
    const day = String(normalizedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
