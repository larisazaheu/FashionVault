import { WardrobeItem } from './wardrobe-item.model';

export interface OutfitEntry {
  id: string;
  date: string;
  title: string;
  imagePath: string;
  itemIds: string[];
}

export interface OutfitEntryDetails extends OutfitEntry {
  items: WardrobeItem[];
}
