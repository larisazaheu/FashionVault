import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorizontalCarouselComponent } from '../../components/horizontal-carousel/horizontal-carousel.component';
import { WardrobeItem } from '../../models/wardrobe-item.model';
import { WardrobeService } from '../../services/wardrobe.service';

interface OutfitGroup {
  label: string;
  categories: string[];
}

@Component({
  selector: 'app-outfits-page',
  templateUrl: './outfits-page.component.html',
  styleUrl: './outfits-page.component.css',
  standalone: true,
  imports: [CommonModule, HorizontalCarouselComponent],
})
export class OutfitsPageComponent implements OnInit {
  items: WardrobeItem[] = [];
  selectedItemIds: string[] = [];
  createdOutfitLabel: string | null = null;

  readonly groups: OutfitGroup[] = [
    { label: 'Top', categories: ['Tops', 'Outerwear', 'Knitwear', 'Dresses'] },
    { label: 'Bottom', categories: ['Bottoms'] },
    { label: 'Shoes', categories: ['Shoes'] },
  ];

  readonly savedOutfits = [
    { name: 'City Coffee Run', note: 'Light layers and sneakers', items: ['Poplin Overshirt', 'Straight Leg Denim'] },
    { name: 'Studio Meeting', note: 'Polished but still soft', items: ['Tailored Wool Blazer', 'Silk Slip Dress'] },
    { name: 'Weekend Ease', note: 'Casual essentials', items: ['Cashmere Knit', 'Leather Sandals'] },
  ];

  constructor(private readonly wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.items = items;
    });
  }

  get selectedItems(): WardrobeItem[] {
    return this.items.filter((item) => this.selectedItemIds.includes(item.id));
  }

  itemsForGroup(categories: string[]): WardrobeItem[] {
    return this.items.filter((item) => categories.includes(item.category));
  }

  toggleSelection(itemId: string): void {
    this.selectedItemIds = this.selectedItemIds.includes(itemId)
      ? this.selectedItemIds.filter((id) => id !== itemId)
      : [...this.selectedItemIds, itemId];
  }

  createOutfit(): void {
    if (this.selectedItems.length === 0) {
      this.createdOutfitLabel = 'Select a few pieces to create an outfit.';
      return;
    }

    const categories = [...new Set(this.selectedItems.map((item) => item.category))];
    this.createdOutfitLabel = `Created an outfit with ${categories.join(', ')}.`;
  }

  removeOutfit(): void {
    this.selectedItemIds = [];
    this.createdOutfitLabel = null;
  }
}
