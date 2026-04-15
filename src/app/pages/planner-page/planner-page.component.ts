import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailySnapComponent } from '../../components/daily-snap/daily-snap.component';
import { createLocalImagePath } from '../../data/local-images.data';

interface DayPlan {
  id: string;
  day: string;
  outfit: string;
  note: string;
  photoUrl: string | null;
}

@Component({
  selector: 'app-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrl: './planner-page.component.css',
  standalone: true,
  imports: [CommonModule, DailySnapComponent],
})
export class PlannerPageComponent {
  readonly weekPlan: DayPlan[] = [
    {
      id: 'mon',
      day: 'Monday',
      outfit: 'Jacket + Denim',
      note: 'Campus presentation',
      photoUrl: createLocalImagePath('outfits', 'classy.jpg')
    },
    {
      id: 'tue',
      day: 'Tuesday',
      outfit: 'Denim + T-Shirt',
      note: 'Brunch with friends',
      photoUrl: createLocalImagePath('outfits', 'yellow.jpg')
    },
    {
      id: 'wed',
      day: 'Wednesday',
      outfit: 'Overshirt + Trousers',
      note: 'Library day',
      photoUrl: createLocalImagePath('outfits', 'casual.jpg')
    },
    {
      id: 'thu',
      day: 'Thursday',
      outfit: 'Cashmere Knit + Denim',
      note: 'Casual meetings',
      photoUrl: createLocalImagePath('outfits', 'cold.jpg')
    },
    {
      id: 'fri',
      day: 'Friday',
      outfit: 'Blouse + Denim',
      note: 'Studio visit',
      photoUrl: createLocalImagePath('outfits', 'outfit.jpg')
    },
    {
      id: 'sat',
      day: 'Saturday',
      outfit: 'Jeans + Tank top',
      note: 'Shopping trip',
      photoUrl: createLocalImagePath('outfits', 'summer.jpg')
    },
    {
      id: 'sun',
      day: 'Sunday',
      outfit: 'Sweater + Sneakers',
      note: 'Family gathering',
      photoUrl: createLocalImagePath('outfits', 'comfy.jpg')
    }
  ];

  updateDayPhoto(dayId: string, preview: string | null): void {
    const day = this.weekPlan.find((entry) => entry.id === dayId);
    if (day) {
      day.photoUrl = preview;
    }
  }
}
