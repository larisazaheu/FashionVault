import { WardrobeCategory, WardrobeColor, WardrobeSeason, WardrobeStyle } from './wardrobe-options.model';

export interface WardrobeItem {
  id: string;
  name: string;
  category: WardrobeCategory;
  brand: string;
  style: WardrobeStyle;
  color: WardrobeColor;
  season: WardrobeSeason;
  availability: 'Available' | 'Laundry';
  wearCount: number;
  lastWornLabel: string;
  lastWornDate?: number;
  addedAt: number;
  imagePath: string;
  isFavorite: boolean;
}
