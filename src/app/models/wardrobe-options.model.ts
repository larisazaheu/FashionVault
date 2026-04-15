export const WARDROBE_CATEGORIES = [
  'Tops',
  'Bottoms',
  'Dresses',
  'Outerwear',
  'Shoes',
  'Knitwear',
] as const;

export const WARDROBE_COLORS = [
  'Black',
  'White',
  'Gray',
  'Red',
  'Pink',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Brown',
  'Beige',
] as const;

export const WARDROBE_STYLES = [
  'Casual',
  'Elegant',
  'Sporty',
  'Office',
  'Streetwear',
  'Preppy',
] as const;

export const WARDROBE_SEASONS = ['All Season', 'Spring', 'Summer', 'Autumn', 'Winter'] as const;

export const WARDROBE_CATEGORY_FILTERS = ['All', ...WARDROBE_CATEGORIES] as const;
export const WARDROBE_STYLE_FILTERS = ['All', ...WARDROBE_STYLES] as const;

export type WardrobeCategory = (typeof WARDROBE_CATEGORIES)[number];
export type WardrobeSeason = (typeof WARDROBE_SEASONS)[number];
export type WardrobeColor = (typeof WARDROBE_COLORS)[number];
export type WardrobeStyle = (typeof WARDROBE_STYLES)[number];
export type WardrobeCategoryFilter = (typeof WARDROBE_CATEGORY_FILTERS)[number];
export type WardrobeStyleFilter = (typeof WARDROBE_STYLE_FILTERS)[number];
