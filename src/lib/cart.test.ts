import { describe, expect, it } from 'vitest';
import type { Product } from '../data/products';
import {
  addProductToCart,
  clearCart,
  formatWon,
  getCartSummary,
  removeOneFromCart
} from './cart';

const notebook: Product = {
  id: 'notebook',
  name: '공책 세트',
  price: 1200,
  category: '학용품',
  needLevel: '필수',
  visual: 'note'
};

const blocks: Product = {
  id: 'blocks',
  name: '블록 장난감',
  price: 3000,
  category: '놀이',
  needLevel: '선택',
  visual: 'blocks'
};

describe('cart math', () => {
  it('formats Korean won values with commas', () => {
    expect(formatWon(10000)).toBe('10,000원');
    expect(formatWon(500)).toBe('500원');
  });

  it('adds products and subtracts the total from the budget', () => {
    const first = addProductToCart([], notebook, 10000);
    const second = addProductToCart(first.lines, blocks, 10000);

    expect(second.accepted).toBe(true);
    expect(getCartSummary(second.lines, 10000)).toEqual({
      lines: [
        { product: notebook, quantity: 1, lineTotal: 1200 },
        { product: blocks, quantity: 1, lineTotal: 3000 }
      ],
      itemCount: 2,
      total: 4200,
      remaining: 5800,
      needsCount: 1,
      wantsCount: 1
    });
  });

  it('groups repeated products into one cart line', () => {
    const first = addProductToCart([], notebook, 10000);
    const second = addProductToCart(first.lines, notebook, 10000);

    expect(second.lines).toHaveLength(1);
    expect(second.lines[0]).toMatchObject({
      product: notebook,
      quantity: 2,
      lineTotal: 2400
    });
  });

  it('rejects a product when it would exceed the budget', () => {
    const first = addProductToCart([], blocks, 3000);
    const second = addProductToCart(first.lines, notebook, 3000);

    expect(second.accepted).toBe(false);
    expect(second.lines).toEqual(first.lines);
    expect(second.message).toBe('예산이 부족해요! 합리적 소비를 위해 다시 고민해 볼까요?');
  });

  it('removes one quantity at a time and clears the cart', () => {
    const first = addProductToCart([], notebook, 10000);
    const second = addProductToCart(first.lines, notebook, 10000);
    const removed = removeOneFromCart(second.lines, notebook.id);

    expect(removed).toEqual([{ product: notebook, quantity: 1, lineTotal: 1200 }]);
    expect(clearCart(removed)).toEqual([]);
  });
});
