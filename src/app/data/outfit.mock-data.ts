import { OutfitEntry } from '../models/outfit-entry.model';
import { createLocalImagePath } from './local-images.data';

function toIsoDate(daysAgo: number): string {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const OUTFIT_LOG_MOCK_DATA: OutfitEntry[] = [
  {
    id: 'outfit-1',
    date: toIsoDate(0),
    title: 'Clean lines for today',
    imagePath: createLocalImagePath('outfits', 'classy.jpg'),
    itemIds: ['item-1', 'item-10'],
  },
  {
    id: 'outfit-2',
    date: toIsoDate(1),
    title: 'Easy denim layers',
    imagePath: createLocalImagePath('outfits', 'casual.jpg'),
    itemIds: ['item-8', 'item-6', 'item-2'],
  },
  {
    id: 'outfit-3',
    date: toIsoDate(2),
    title: 'Soft neutrals',
    imagePath: createLocalImagePath('outfits', 'comfy.jpg'),
    itemIds: ['item-5', 'item-9', 'item-6'],
  },
  {
    id: 'outfit-4',
    date: toIsoDate(3),
    title: 'Light evening look',
    imagePath: createLocalImagePath('outfits', 'yellow.jpg'),
    itemIds: ['item-5', 'item-7', 'item-10'],
  },
  {
    id: 'outfit-5',
    date: toIsoDate(7),
    title: 'Weekend casual',
    imagePath: createLocalImagePath('outfits', 'summer.jpg'),
    itemIds: ['item-2', 'item-4', 'item-6', 'item-8'],
  },
  {
    id: 'outfit-6',
    date: toIsoDate(10),
    title: 'Polished office mix',
    imagePath: createLocalImagePath('outfits', 'polka.jpg'),
    itemIds: ['item-1', 'item-10'],
  },
  {
    id: 'outfit-7',
    date: toIsoDate(13),
    title: 'Warm knit day',
    imagePath: createLocalImagePath('outfits', 'cold.jpg'),
    itemIds: ['item-9', 'item-6'],
  },
];
