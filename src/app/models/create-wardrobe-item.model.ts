import { WardrobeCategory, WardrobeStyle, WardrobeColor, WardrobeSeason } from '../models/wardrobe-options.model';

export interface CreateWardrobeItem {
  name: string;
  category: WardrobeCategory;
  brand: string;
  color: WardrobeColor;
  season: WardrobeSeason;
  style: WardrobeStyle;
  imagePath: string;
}

export function createEmptyWardrobeItem(): CreateWardrobeItem {
  return {
    name: '',
    category: 'Tops',
    brand: '',
    style: 'Casual',
    color: 'Black',
    season: 'All Season',
    imagePath: '',
  };
}
