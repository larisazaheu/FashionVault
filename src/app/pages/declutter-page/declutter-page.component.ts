import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardrobeItem } from '../../models/wardrobe-item.model';
import { WardrobeService } from '../../services/wardrobe.service';

@Component({
  selector: 'app-declutter-page',
  templateUrl: './declutter-page.component.html',
  styleUrl: './declutter-page.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class DeclutterPageComponent implements OnInit {
  readonly thresholds = [14, 30, 60];
  selectedThreshold = 30;
  items: WardrobeItem[] = [];

  constructor(private readonly wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.items = items;
    });
  }

  removeItem(itemId: string): void {
    this.wardrobeService.removeWardrobeItem(itemId).subscribe();
  }

  get unusedItems(): WardrobeItem[] {
    const now = Date.now();
    const cutoff = this.selectedThreshold * 24 * 60 * 60 * 1000;

    return this.items.filter((item) => {
      const lastWornDate = item.lastWornDate ?? 0;
      return now - lastWornDate >= cutoff;
    });
  }
}
