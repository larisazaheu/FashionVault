import { WardrobeCategory } from '../models/wardrobe-options.model';

type WardrobeImageFolder = 'bottoms' | 'jackets' | 'shoes' | 'tops';
type ImageFolder = WardrobeImageFolder | 'outfits';

export interface LocalImageOption {
  id: string;
  folder: ImageFolder;
  label: string;
  path: string;
}

const WARDROBE_IMAGE_FILES: Record<WardrobeImageFolder, readonly string[]> = {
  bottoms: ['jeans1.jpg', 'jeans2.jpg', 'jeans3.jpg', 'skirt.jpg'],
  jackets: ['jacket.jpg', 'jacket2.jpg', 'jacket3.jpg', 'suit.jpg'],
  shoes: [
    'converse.jpg',
    'converse2.jpg',
    'heels.jpg',
    'heels2.jpg',
    'newbalance.jpg',
    'samba.jpg',
    'samba (2).jpg',
    'uggs.jpg',
  ],
  tops: ['blouse.jpg', 'blouse2.jpg', 'blouse3.jpg', 'sweater.jpg', 'top.jpg', 'top2.jpg', 'top3.jpg'],
};

const OUTFIT_IMAGE_FILES = [
  'black.jpg',
  'casual.jpg',
  'classy.jpg',
  'cold.jpg',
  'combo.jpg',
  'comfy.jpg',
  'out.jpg',
  'outfit.jpg',
  'polka.jpg',
  'rachel.jpg',
  'summer.jpg',
  'yellow.jpg',
] as const;

const CATEGORY_IMAGE_FOLDERS: Record<WardrobeCategory, readonly WardrobeImageFolder[]> = {
  Tops: ['tops'],
  Bottoms: ['bottoms'],
  Dresses: ['tops'],
  Outerwear: ['jackets'],
  Shoes: ['shoes'],
  Knitwear: ['tops', 'jackets'],
};

export function createLocalImagePath(folder: ImageFolder, fileName: string): string {
  return `/images/${folder}/${fileName}`;
}

function formatImageLabel(fileName: string): string {
  return fileName
    .replace(/\.[^/.]+$/, '')
    .replace(/\(\d+\)/g, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildImageOptions(folder: ImageFolder, fileNames: readonly string[]): LocalImageOption[] {
  return fileNames.map((fileName) => ({
    id: `${folder}-${fileName}`,
    folder,
    label: formatImageLabel(fileName),
    path: createLocalImagePath(folder, fileName),
  }));
}

export const WARDROBE_IMAGE_OPTIONS = (Object.entries(WARDROBE_IMAGE_FILES) as [
  WardrobeImageFolder,
  readonly string[],
][])
  .flatMap(([folder, fileNames]) => buildImageOptions(folder, fileNames));

export const OUTFIT_IMAGE_OPTIONS = buildImageOptions('outfits', OUTFIT_IMAGE_FILES);

export function getWardrobeImageOptions(category: WardrobeCategory): LocalImageOption[] {
  const folders = CATEGORY_IMAGE_FOLDERS[category];
  const matchingOptions = WARDROBE_IMAGE_OPTIONS.filter((option) =>
    folders.includes(option.folder as WardrobeImageFolder)
  );

  return matchingOptions.length > 0 ? matchingOptions : WARDROBE_IMAGE_OPTIONS;
}
