import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddWardrobeItemModalComponent } from '../../components/add-wardrobe-item-modal/add-wardrobe-item-modal.component';
import { ClothingCardComponent } from '../../components/clothing-card/clothing-card.component';
import { HorizontalCarouselComponent } from '../../components/horizontal-carousel/horizontal-carousel.component';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { CreateWardrobeItem } from '../../models/create-wardrobe-item.model';
import {
  WARDROBE_CATEGORY_FILTERS,
  WARDROBE_CATEGORIES,
  WARDROBE_COLORS,
  WARDROBE_SEASONS,
  WARDROBE_STYLE_FILTERS,
  WARDROBE_STYLES,
  WardrobeCategoryFilter,
  WardrobeStyleFilter,
} from '../../models/wardrobe-options.model';
import { WardrobeItem } from '../../models/wardrobe-item.model';
import { WardrobeService } from '../../services/wardrobe.service';

@Component({
  selector: 'app-wardrobe-list-page',
  standalone: true,
  imports: [
    CommonModule,
    ClothingCardComponent,
    AddWardrobeItemModalComponent,
    HorizontalCarouselComponent,
    StatCardComponent,
  ],
  templateUrl: './wardrobe-page.component.html',
  styleUrl: './wardrobe-page.component.css',
})
export class WardrobeListPageComponent implements OnInit {
  readonly categoryFilters = WARDROBE_CATEGORY_FILTERS;
  readonly styleFilters = WARDROBE_STYLE_FILTERS;
  readonly categories = WARDROBE_CATEGORIES;
  readonly seasons = WARDROBE_SEASONS;
  readonly colors = WARDROBE_COLORS;
  readonly styles = WARDROBE_STYLES;

  items: WardrobeItem[] = [];
  recentItems: WardrobeItem[] = [];
  visibleItems: WardrobeItem[] = [];

  activeCategory: WardrobeCategoryFilter = 'All';
  activeStyle: WardrobeStyleFilter = 'All';

  mostWornStyle = 'No data';
  isLoading = true;
  isAddModalOpen = false;

  constructor(private readonly wardrobeService: WardrobeService) {}

  ngOnInit(): void {
    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.items = items;
      this.applyFilter();
      this.isLoading = false;
    });

    this.wardrobeService.getRecentItems().subscribe((items) => {
      this.recentItems = items;
    });

    this.wardrobeService.getDashboardStats().subscribe((stats) => {
      this.mostWornStyle = stats.mostWornStyle;
    });
  }

  trackByItemId(_: number, item: WardrobeItem): string {
    return item.id;
  }

  selectCategory(category: WardrobeCategoryFilter): void {
    this.activeCategory = category;
    this.applyFilter();
  }

  selectStyle(style: WardrobeStyleFilter): void {
    this.activeStyle = style;
    this.applyFilter();
  }

  openAddItemModal(): void {
    this.isAddModalOpen = true;
  }

  closeAddItemModal(): void {
    this.isAddModalOpen = false;
  }

  saveItem(item: CreateWardrobeItem): void {
    this.wardrobeService.addWardrobeItem(item).subscribe(() => {
      this.closeAddItemModal();
    });
  }

  toggleFavorite(itemId: string): void {
    this.wardrobeService.toggleFavorite(itemId).subscribe();
  }

  removeItem(itemId: string): void {
    this.wardrobeService.removeWardrobeItem(itemId).subscribe();
  }

  markAsWorn(itemId: string): void {
    this.wardrobeService.markAsWorn(itemId).subscribe();
  }

  private applyFilter(): void {
    this.visibleItems = this.items.filter((item) => {
      const matchesCategory =
        this.activeCategory === 'All' || item.category === this.activeCategory;
      const matchesStyle = this.activeStyle === 'All' || item.style === this.activeStyle;

      return matchesCategory && matchesStyle;
    });
  }
}
