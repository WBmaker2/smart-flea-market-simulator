import type { Product } from '../data/products';

export type CartLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

export type CartSummary = {
  lines: CartLine[];
  itemCount: number;
  total: number;
  remaining: number;
  needsCount: number;
  wantsCount: number;
};

export type AddProductResult = {
  lines: CartLine[];
  accepted: boolean;
  message: string;
};

export const OVER_BUDGET_MESSAGE = '예산이 부족해요! 합리적 소비를 위해 다시 고민해 볼까요?';

function normalizeCartLines(lines: CartLine[]): CartLine[] {
  return lines.map((line) => ({
    ...line,
    lineTotal: line.product.price * line.quantity
  }));
}

export function formatWon(value: number): string {
  return `${value.toLocaleString('ko-KR')}원`;
}

export function getCartSummary(lines: CartLine[], budget: number): CartSummary {
  const normalizedLines = normalizeCartLines(lines);
  const total = normalizedLines.reduce((sum, line) => sum + line.lineTotal, 0);
  const itemCount = normalizedLines.reduce((sum, line) => sum + line.quantity, 0);
  const needsCount = normalizedLines.reduce(
    (sum, line) => sum + (line.product.needLevel === '필수' ? line.quantity : 0),
    0
  );
  const wantsCount = itemCount - needsCount;

  return {
    lines: normalizedLines,
    itemCount,
    total,
    remaining: budget - total,
    needsCount,
    wantsCount
  };
}

export function addProductToCart(lines: CartLine[], product: Product, budget: number): AddProductResult {
  const normalizedCurrentLines = normalizeCartLines(lines);
  const existing = normalizedCurrentLines.find((line) => line.product.id === product.id);
  const nextLines = existing
    ? normalizedCurrentLines.map((line) =>
        line.product.id === product.id
          ? { ...line, quantity: line.quantity + 1, lineTotal: product.price * (line.quantity + 1) }
          : line
      )
    : [...normalizedCurrentLines, { product, quantity: 1, lineTotal: product.price }];

  const summary = getCartSummary(nextLines, budget);

  if (summary.remaining < 0) {
    return {
      lines: normalizeCartLines(lines),
      accepted: false,
      message: OVER_BUDGET_MESSAGE
    };
  }

  return {
    lines: summary.lines,
    accepted: true,
    message: `${product.name} 장바구니에 담았어요.`
  };
}

export function removeOneFromCart(lines: CartLine[], productId: string): CartLine[] {
  const normalizedLines = normalizeCartLines(lines);

  return normalizedLines.flatMap((line) => {
    if (line.product.id !== productId) {
      return [normalizeCartLine(line)];
    }

    if (line.quantity <= 1) {
      return [];
    }

    return [normalizeCartLine({ ...line, quantity: line.quantity - 1 })];
  });
}

export function clearCart(_lines: CartLine[]): CartLine[] {
  return [];
}

function normalizeCartLine(line: CartLine): CartLine {
  return {
    ...line,
    lineTotal: line.product.price * line.quantity
  };
}
