import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardrobeItem } from '../../models/wardrobe-item.model';
import { WardrobeService } from '../../services/wardrobe.service';

@Component({
  selector: 'app-laundry-page',
  templateUrl: './laundry-page.component.html',
  styleUrl: './laundry-page.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class LaundryPageComponent implements OnInit {
  items: WardrobeItem[] = [];
  showLaundryOnly = false;

  constructor(private readonly wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  get filteredItems(): WardrobeItem[] {
    return this.showLaundryOnly
      ? this.items.filter((item) => item.availability === 'Laundry')
      : this.items;
  }

  get availableCount(): number {
    return this.items.filter((item) => item.availability === 'Available').length;
  }

  get laundryCount(): number {
    return this.items.filter((item) => item.availability === 'Laundry').length;
  }

  toggleView(showLaundryOnly: boolean): void {
    this.showLaundryOnly = showLaundryOnly;
  }

  toggleAvailability(itemId: string): void {
    this.wardrobeService.toggleAvailability(itemId).subscribe((items) => {
      this.items = items;
    });
  }

  private loadItems(): void {
    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.items = items;
    });
  }
}
