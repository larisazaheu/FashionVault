import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { createLocalImagePath } from '../../data/local-images.data';
import { WardrobeItem } from '../../models/wardrobe-item.model';

interface Outfit {
  activity: string;
  title: string;
  items: Partial<WardrobeItem>[];
}

@Component({
  selector: 'app-travel-page',
  templateUrl: './travel-page.component.html',
  styleUrl: './travel-page.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TravelPageComponent {
  destination = 'Paris';
  startDate = '';
  endDate = '';

  activityOptions = [
    { value: 'city', label: 'City walking', icon: 'C' },
    { value: 'beach', label: 'Beach days', icon: 'B' },
    { value: 'hiking', label: 'Outdoor adventure', icon: 'H' },
    { value: 'evening', label: 'Evening events', icon: 'N' },
  ];

  selectedActivities: string[] = ['city'];

  outfitSuggestions: Outfit[] = [
    {
      activity: 'city',
      title: 'Day Look: City Sightseeing',
      items: [
        { name: 'Straight Leg Denim', imagePath: createLocalImagePath('bottoms', 'jeans2.jpg') },
        { name: 'White Cotton Tee', imagePath: createLocalImagePath('tops', 'top.jpg') },
        { name: 'Leather Sandals', imagePath: createLocalImagePath('shoes', 'heels2.jpg') },
      ],
    },
    {
      activity: 'evening',
      title: 'Night Look: Dinner Out',
      items: [
        { name: 'Silk Slip Dress', imagePath: createLocalImagePath('tops', 'blouse.jpg') },
        { name: 'Tailored Wool Blazer', imagePath: createLocalImagePath('jackets', 'jacket3.jpg') },
        { name: 'Leather Sandals', imagePath: createLocalImagePath('shoes', 'heels.jpg') },
      ],
    },
  ];

  toggleActivity(value: string): void {
    const index = this.selectedActivities.indexOf(value);

    if (index > -1) {
      this.selectedActivities.splice(index, 1);
    } else {
      this.selectedActivities.push(value);
    }
  }

  isActivitySelected(value: string): boolean {
    return this.selectedActivities.includes(value);
  }

  get filteredOutfits(): Outfit[] {
    return this.outfitSuggestions.filter((outfit) =>
      this.selectedActivities.includes(outfit.activity)
    );
  }

  get masterChecklist(): string[] {
    const allItems = this.filteredOutfits.flatMap((outfit) =>
      outfit.items.map((item) => item.name || '')
    );

    return [...new Set(allItems)];
  }

  get weatherAdvice(): string {
    if (this.selectedActivities.includes('hiking')) {
      return 'Bring weatherproof layers and sturdy boots.';
    }

    return 'Comfortable walking shoes and a breathable jacket work best.';
  }
}
