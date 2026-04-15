import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  LocalImageOption,
  getWardrobeImageOptions,
} from '../../data/local-images.data';
import {
  CreateWardrobeItem,
  createEmptyWardrobeItem,
} from '../../models/create-wardrobe-item.model';
import {
  WardrobeCategory,
  WardrobeColor,
  WardrobeSeason,
  WardrobeStyle,
} from '../../models/wardrobe-options.model';

@Component({
  selector: 'app-add-wardrobe-item-modal',
  templateUrl: './add-wardrobe-item-modal.component.html',
  styleUrl: './add-wardrobe-item-modal.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AddWardrobeItemModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() categories: readonly WardrobeCategory[] = [];
  @Input() colors: readonly WardrobeColor[] = [];
  @Input() seasons: readonly WardrobeSeason[] = [];
  @Input() styles: readonly WardrobeStyle[] = [];

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<CreateWardrobeItem>();

  form: CreateWardrobeItem = createEmptyWardrobeItem();

  get availableImages(): LocalImageOption[] {
    return getWardrobeImageOptions(this.form.category);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue) {
      this.form = createEmptyWardrobeItem();
      this.ensureSelectedImage();
    }
  }

  close(): void {
    this.closed.emit();
  }

  onCategoryChange(category: WardrobeCategory): void {
    this.form.category = category;
    this.ensureSelectedImage();
  }

  selectImage(imagePath: string): void {
    this.form.imagePath = imagePath;
  }

  save(): void {
    this.saved.emit({ ...this.form });
  }

  trackByImageId(_: number, image: LocalImageOption): string {
    return image.id;
  }

  private ensureSelectedImage(): void {
    const hasSelectedImage = this.availableImages.some(
      (image) => image.path === this.form.imagePath
    );

    if (!hasSelectedImage) {
      this.form.imagePath = this.availableImages[0]?.path ?? '';
    }
  }
}
