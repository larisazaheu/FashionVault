import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClothingCardComponent } from '../../components/clothing-card/clothing-card.component';
import { WardrobeItem } from '../../models/wardrobe-item.model';
import { WardrobeService } from '../../services/wardrobe.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, ClothingCardComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
})
export class FavoritesPageComponent implements OnInit {
  favoriteItems: WardrobeItem[] = [];

  constructor(private readonly wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.favoriteItems = items.filter((item) => item.isFavorite);
    });
  }

  toggleFavorite(itemId: string): void {
    this.wardrobeService.toggleFavorite(itemId).subscribe();
  }

  removeItem(itemId: string): void {
    this.wardrobeService.removeWardrobeItem(itemId).subscribe();
  }
}
