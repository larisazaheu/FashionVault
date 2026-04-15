import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardrobeItem } from '../../models/wardrobe-item.model';

@Component({
  selector: 'app-clothing-card',
  templateUrl: './clothing-card.component.html',
  styleUrl: './clothing-card.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class ClothingCardComponent {
  @Input({ required: true }) item!: WardrobeItem;

  @Output() favoriteToggle = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() markWorn = new EventEmitter<string>();

  onMarkWorn(): void {
    this.markWorn.emit(this.item.id);
  }

  onFavoriteToggle(): void {
    this.favoriteToggle.emit(this.item.id);
  }

  onRemove(): void {
    this.remove.emit(this.item.id);
  }
}
