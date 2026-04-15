import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardrobeItem } from '../../models/wardrobe-item.model';
import { WardrobeService } from '../../services/wardrobe.service';
import { DailySnapComponent } from '../daily-snap/daily-snap.component';

@Component({
  selector: 'app-today-action',
  standalone: true,
  imports: [CommonModule, DailySnapComponent],
  templateUrl: './today-action.component.html',
  styleUrl: './today-action.component.css',
})
export class TodayActionComponent {
  @Input() items: WardrobeItem[] = [];

  suggestedItems: WardrobeItem[] = [];
  snapPreview: string | null = null;
  suggestionLabel = 'Choose a weather-friendly set from your available wardrobe.';

  constructor(private readonly wardrobeService: WardrobeService) { }

  suggestOutfit(): void {
    this.suggestedItems = this.wardrobeService.suggestOutfitBundle(this.items);
    this.suggestionLabel =
      this.suggestedItems.length === 0
        ? 'No available outfit could be generated with your current wardrobe.'
        : 'A complete set built from your least worn available pieces.';
  }

  onSnapPreviewChange(imageUrl: string | null): void {
    this.snapPreview = imageUrl;
  }

  clearSnap(): void {
    this.snapPreview = null;
  }
}
