export type ProductCategory = '학용품' | '간식' | '놀이' | '생활';
export type NeedLevel = '필수' | '선택';
export type ProductVisual =
  | 'pencil'
  | 'note'
  | 'eraser'
  | 'snack'
  | 'juice'
  | 'blocks'
  | 'yo-yo'
  | 'sticker'
  | 'bag'
  | 'water';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  needLevel: NeedLevel;
  visual: ProductVisual;
};

export const STARTING_BUDGET = 10000;

export const products: Product[] = [
  { id: 'colored-pencils', name: '색연필 세트', price: 1500, category: '학용품', needLevel: '필수', visual: 'pencil' },
  { id: 'notebook-pack', name: '공책 세트', price: 1200, category: '학용품', needLevel: '필수', visual: 'note' },
  { id: 'eraser-set', name: '지우개 묶음', price: 500, category: '학용품', needLevel: '필수', visual: 'eraser' },
  { id: 'rice-snack', name: '쌀과자', price: 800, category: '간식', needLevel: '선택', visual: 'snack' },
  { id: 'fruit-juice', name: '과일 주스', price: 1000, category: '간식', needLevel: '선택', visual: 'juice' },
  { id: 'mini-blocks', name: '미니 블록', price: 3000, category: '놀이', needLevel: '선택', visual: 'blocks' },
  { id: 'yo-yo', name: '요요', price: 1800, category: '놀이', needLevel: '선택', visual: 'yo-yo' },
  { id: 'sticker-book', name: '스티커북', price: 2200, category: '놀이', needLevel: '선택', visual: 'sticker' },
  { id: 'pouch', name: '필통 파우치', price: 2500, category: '생활', needLevel: '필수', visual: 'bag' },
  { id: 'water-bottle', name: '물병', price: 2800, category: '생활', needLevel: '필수', visual: 'water' }
];
