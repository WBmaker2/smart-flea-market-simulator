# Smart Flea Market Simulator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 3-4학년 학생이 한정된 예산 안에서 물건을 고르며 합리적 소비와 세 자리 수 덧셈/뺄셈을 체험하는 교실용 웹앱을 만든다.

**Architecture:** Vite + React + TypeScript 단일 페이지 앱으로 구현한다. 예산 계산과 장바구니 상태 전환은 순수 함수로 분리하고, React 컴포넌트는 상품 선택, 장바구니, 결제 성찰 화면을 담당한다.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, React Testing Library, lucide-react, CSS Modules 없이 전역 `src/styles.css`

---

## File Structure

- Create: `package.json` - npm scripts, runtime dependencies, test dependencies
- Create: `index.html` - Vite root HTML
- Create: `tsconfig.json` - app TypeScript config
- Create: `tsconfig.node.json` - Vite config TypeScript config
- Create: `vite.config.ts` - React plugin and Vitest jsdom setup
- Create: `src/main.tsx` - React entrypoint
- Create: `src/App.tsx` - app state orchestration and screen composition
- Create: `src/styles.css` - responsive classroom tool styling
- Create: `src/vite-env.d.ts` - Vite type reference
- Create: `src/data/products.ts` - budget constant and product catalog
- Create: `src/lib/cart.ts` - pure cart and budget calculation functions
- Create: `src/lib/cart.test.ts` - unit tests for math and cart rules
- Create: `src/components/BudgetBar.tsx` - title, wallet, spent, remaining budget
- Create: `src/components/ProductGrid.tsx` - accessible product buttons
- Create: `src/components/CartPanel.tsx` - selected items, remove/reset/checkout controls
- Create: `src/components/ReflectionPanel.tsx` - checkout result and rational-consumption prompts
- Create: `src/App.test.tsx` - user-flow component tests
- Create: `README.md` - Korean project summary, commands, classroom usage, QA checklist

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: Initialize git for frequent commits**

Run:

```bash
git init
```

Expected: repository initialized with `.git/`.

- [ ] **Step 2: Write project package metadata**

Create `package.json`:

```json
{
  "name": "smart-flea-market-simulator",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "jsdom": "^25.0.1",
    "typescript": "^5.6.3",
    "vite": "^5.4.0",
    "vitest": "^2.1.5"
  }
}
```

- [ ] **Step 3: Write Vite HTML shell**

Create `index.html`:

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="3-4학년 사회와 수학을 연결한 우리 반 알뜰 시장 장바구니 시뮬레이터"
    />
    <title>왁자지껄 우리 반 알뜰 시장</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Write TypeScript config**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Write Vite and Vitest config**

Create `vite.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: []
  }
});
```

- [ ] **Step 6: Write temporary React entrypoint**

Create `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Create `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

Temporarily create `src/App.tsx` so the scaffold compiles before the feature tasks:

```tsx
export default function App() {
  return <main>왁자지껄 우리 반 알뜰 시장</main>;
}
```

Temporarily create `src/styles.css`:

```css
:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #18212f;
  background: #f7f2e8;
}

body {
  margin: 0;
}
```

- [ ] **Step 7: Install dependencies**

Run:

```bash
npm install
```

Expected: `node_modules/` and `package-lock.json` are created without install errors.

- [ ] **Step 8: Verify scaffold builds**

Run:

```bash
npm run build
```

Expected: `tsc -b && vite build` exits with code 0 and creates `dist/`.

- [ ] **Step 9: Commit scaffold**

Run:

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts src/main.tsx src/vite-env.d.ts src/App.tsx src/styles.css
git commit -m "chore: scaffold flea market simulator"
```

Expected: one scaffold commit is created.

## Task 2: Product Catalog and Cart Math

**Files:**
- Create: `src/data/products.ts`
- Create: `src/lib/cart.ts`
- Create: `src/lib/cart.test.ts`

- [ ] **Step 1: Write failing cart tests**

Create `src/lib/cart.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the failing cart tests**

Run:

```bash
npm test -- src/lib/cart.test.ts
```

Expected: FAIL because `src/data/products.ts` and `src/lib/cart.ts` do not exist.

- [ ] **Step 3: Implement product catalog**

Create `src/data/products.ts`:

```ts
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
```

- [ ] **Step 4: Implement cart math**

Create `src/lib/cart.ts`:

```ts
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

export function formatWon(value: number): string {
  return `${value.toLocaleString('ko-KR')}원`;
}

export function getCartSummary(lines: CartLine[], budget: number): CartSummary {
  const normalizedLines = lines.map((line) => ({
    ...line,
    lineTotal: line.product.price * line.quantity
  }));
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
  const existing = lines.find((line) => line.product.id === product.id);
  const nextLines = existing
    ? lines.map((line) =>
        line.product.id === product.id
          ? { ...line, quantity: line.quantity + 1, lineTotal: product.price * (line.quantity + 1) }
          : line
      )
    : [...lines, { product, quantity: 1, lineTotal: product.price }];

  const summary = getCartSummary(nextLines, budget);

  if (summary.remaining < 0) {
    return {
      lines,
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
  return lines.flatMap((line) => {
    if (line.product.id !== productId) {
      return [line];
    }

    if (line.quantity <= 1) {
      return [];
    }

    return [{ ...line, quantity: line.quantity - 1, lineTotal: line.product.price * (line.quantity - 1) }];
  });
}

export function clearCart(_lines: CartLine[]): CartLine[] {
  return [];
}
```

- [ ] **Step 5: Run cart tests**

Run:

```bash
npm test -- src/lib/cart.test.ts
```

Expected: PASS for all five cart tests.

- [ ] **Step 6: Commit cart domain layer**

Run:

```bash
git add src/data/products.ts src/lib/cart.ts src/lib/cart.test.ts
git commit -m "feat: add flea market cart math"
```

Expected: one feature commit is created.

## Task 3: App Interaction and Accessible Components

**Files:**
- Modify: `src/App.tsx`
- Create: `src/App.test.tsx`
- Create: `src/components/BudgetBar.tsx`
- Create: `src/components/ProductGrid.tsx`
- Create: `src/components/CartPanel.tsx`
- Create: `src/components/ReflectionPanel.tsx`

- [ ] **Step 1: Write failing app user-flow tests**

Create `src/App.test.tsx`:

```tsx
import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Smart Flea Market Simulator', () => {
  it('starts with 10,000 won and subtracts selected products in real time', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: '왁자지껄 우리 반 알뜰 시장' })).toBeInTheDocument();
    expect(screen.getByLabelText('남은 예산')).toHaveTextContent('10,000원');

    await user.click(screen.getByRole('button', { name: /색연필 세트 1,500원 담기/ }));
    await user.click(screen.getByRole('button', { name: /공책 세트 1,200원 담기/ }));

    expect(screen.getByLabelText('쓴 돈')).toHaveTextContent('2,700원');
    expect(screen.getByLabelText('남은 예산')).toHaveTextContent('7,300원');
    expect(screen.getByRole('status')).toHaveTextContent('공책 세트 장바구니에 담았어요.');
  });

  it('shows an alert and keeps the cart unchanged when a choice exceeds the budget', async () => {
    const user = userEvent.setup();
    render(<App />);

    for (let index = 0; index < 3; index += 1) {
      await user.click(screen.getByRole('button', { name: /미니 블록 3,000원 담기/ }));
    }
    await user.click(screen.getByRole('button', { name: /물병 2,800원 담기/ }));

    expect(screen.getByRole('alert')).toHaveTextContent('예산이 부족해요! 합리적 소비를 위해 다시 고민해 볼까요?');
    expect(screen.getByLabelText('남은 예산')).toHaveTextContent('1,000원');
    const cart = screen.getByRole('complementary', { name: '장바구니' });
    expect(within(cart).getByText('미니 블록')).toBeInTheDocument();
    expect(within(cart).queryByText('물병')).not.toBeInTheDocument();
  });

  it('removes items, resets the cart, and disables checkout when empty', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /색연필 세트 1,500원 담기/ }));
    await user.click(screen.getByRole('button', { name: /색연필 세트 1,500원 담기/ }));
    await user.click(screen.getByRole('button', { name: /색연필 세트 한 개 빼기/ }));

    const cart = screen.getByRole('complementary', { name: '장바구니' });
    expect(within(cart).getAllByText('1개').length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: '장바구니 비우기' }));

    expect(screen.getByText('아직 고른 물건이 없어요.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '결제하기' })).toBeDisabled();
    expect(screen.getByLabelText('남은 예산')).toHaveTextContent('10,000원');
  });

  it('opens a rational-consumption reflection after checkout', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /색연필 세트 1,500원 담기/ }));
    await user.click(screen.getByRole('button', { name: /쌀과자 800원 담기/ }));
    await user.click(screen.getByRole('button', { name: '결제하기' }));

    const reflection = screen.getByRole('region', { name: '소비 선택 돌아보기' });
    expect(within(reflection).getByText('필수 물건 1개, 선택 물건 1개를 골랐어요.')).toBeInTheDocument();
    expect(within(reflection).getByText('남은 돈은 7,700원이에요.')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the failing app tests**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because the full app and components are not implemented.

- [ ] **Step 3: Implement BudgetBar component**

Create `src/components/BudgetBar.tsx`:

```tsx
import { WalletCards } from 'lucide-react';
import { formatWon } from '../lib/cart';

type BudgetBarProps = {
  budget: number;
  spent: number;
  remaining: number;
};

export function BudgetBar({ budget, spent, remaining }: BudgetBarProps) {
  const remainingPercent = Math.max(0, Math.min(100, (remaining / budget) * 100));

  return (
    <header className="budget-bar">
      <div className="budget-heading">
        <span className="subject-chip">사회 x 수학</span>
        <h1>왁자지껄 우리 반 알뜰 시장</h1>
      </div>
      <div className="wallet-summary" aria-label="예산 계산">
        <WalletCards aria-hidden="true" size={28} />
        <div>
          <span>내 지갑</span>
          <strong>{formatWon(budget)}</strong>
        </div>
        <div>
          <span>쓴 돈</span>
          <output aria-label="쓴 돈">{formatWon(spent)}</output>
        </div>
        <div>
          <span>남은 예산</span>
          <output aria-label="남은 예산">{formatWon(remaining)}</output>
        </div>
      </div>
      <div className="budget-meter" aria-hidden="true">
        <span style={{ width: `${remainingPercent}%` }} />
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Implement ProductGrid component**

Create `src/components/ProductGrid.tsx`:

```tsx
import { PlusCircle } from 'lucide-react';
import type { Product } from '../data/products';
import { formatWon } from '../lib/cart';

type ProductGridProps = {
  products: Product[];
  onAddProduct: (product: Product) => void;
};

const visualLabels: Record<Product['visual'], string> = {
  pencil: '색연필',
  note: '공책',
  eraser: '지우개',
  snack: '쌀과자',
  juice: '주스',
  blocks: '블록',
  'yo-yo': '요요',
  sticker: '스티커',
  bag: '파우치',
  water: '물병'
};

export function ProductGrid({ products, onAddProduct }: ProductGridProps) {
  return (
    <section className="product-section" aria-labelledby="product-heading">
      <div className="section-title">
        <h2 id="product-heading">시장 물건</h2>
        <span>500원-3,000원</span>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            className="product-card"
            onClick={() => onAddProduct(product)}
            aria-label={`${product.name} ${formatWon(product.price)} 담기`}
          >
            <span className={`product-visual ${product.visual}`} aria-hidden="true">
              {visualLabels[product.visual].slice(0, 1)}
            </span>
            <span className="product-meta">
              <strong>{product.name}</strong>
              <span>{product.category}</span>
            </span>
            <span className="product-bottom">
              <span className={product.needLevel === '필수' ? 'need-tag required' : 'need-tag optional'}>
                {product.needLevel}
              </span>
              <b>{formatWon(product.price)}</b>
              <PlusCircle aria-hidden="true" size={18} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement CartPanel component**

Create `src/components/CartPanel.tsx`:

```tsx
import { MinusCircle, ReceiptText, RotateCcw, ShoppingBasket } from 'lucide-react';
import type { CartLine } from '../lib/cart';
import { formatWon } from '../lib/cart';

type CartPanelProps = {
  lines: CartLine[];
  total: number;
  itemCount: number;
  onRemoveOne: (productId: string) => void;
  onClear: () => void;
  onCheckout: () => void;
};

export function CartPanel({ lines, total, itemCount, onRemoveOne, onClear, onCheckout }: CartPanelProps) {
  const isEmpty = itemCount === 0;

  return (
    <aside className="cart-panel" aria-labelledby="cart-heading">
      <div className="section-title">
        <h2 id="cart-heading">장바구니</h2>
        <span>{itemCount}개</span>
      </div>

      {isEmpty ? (
        <p className="empty-cart">
          <ShoppingBasket aria-hidden="true" size={22} />
          아직 고른 물건이 없어요.
        </p>
      ) : (
        <ul className="cart-list">
          {lines.map((line) => (
            <li key={line.product.id} className="cart-line">
              <div>
                <strong>{line.product.name}</strong>
                <span>{formatWon(line.product.price)} x {line.quantity}</span>
              </div>
              <span className="quantity">{line.quantity}개</span>
              <b>{formatWon(line.lineTotal)}</b>
              <button
                type="button"
                className="icon-button"
                onClick={() => onRemoveOne(line.product.id)}
                aria-label={`${line.product.name} 한 개 빼기`}
              >
                <MinusCircle aria-hidden="true" size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total">
        <span>합계</span>
        <strong>{formatWon(total)}</strong>
      </div>

      <div className="cart-actions">
        <button type="button" className="secondary-action" onClick={onClear} disabled={isEmpty}>
          <RotateCcw aria-hidden="true" size={18} />
          장바구니 비우기
        </button>
        <button type="button" className="primary-action" onClick={onCheckout} disabled={isEmpty}>
          <ReceiptText aria-hidden="true" size={18} />
          결제하기
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 6: Implement ReflectionPanel component**

Create `src/components/ReflectionPanel.tsx`:

```tsx
import { CheckCircle2 } from 'lucide-react';
import { formatWon, type CartSummary } from '../lib/cart';

type ReflectionPanelProps = {
  summary: CartSummary;
};

export function ReflectionPanel({ summary }: ReflectionPanelProps) {
  if (summary.itemCount === 0) {
    return null;
  }

  return (
    <section className="reflection-panel" aria-labelledby="reflection-heading" role="region">
      <div className="reflection-title">
        <CheckCircle2 aria-hidden="true" size={22} />
        <h2 id="reflection-heading">소비 선택 돌아보기</h2>
      </div>
      <p>필수 물건 {summary.needsCount}개, 선택 물건 {summary.wantsCount}개를 골랐어요.</p>
      <p>남은 돈은 {formatWon(summary.remaining)}이에요.</p>
      <div className="reflection-prompts">
        <span>필요한 물건을 먼저 골랐나요?</span>
        <span>남은 돈으로 다음 선택을 할 수 있나요?</span>
        <span>다시 고른다면 어떤 물건을 바꾸고 싶나요?</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Implement App orchestration**

Replace `src/App.tsx`:

```tsx
import { useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { BudgetBar } from './components/BudgetBar';
import { CartPanel } from './components/CartPanel';
import { ProductGrid } from './components/ProductGrid';
import { ReflectionPanel } from './components/ReflectionPanel';
import { products, STARTING_BUDGET, type Product } from './data/products';
import {
  addProductToCart,
  clearCart,
  getCartSummary,
  removeOneFromCart,
  type CartLine
} from './lib/cart';

export default function App() {
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [notice, setNotice] = useState('필요한 물건부터 골라 보세요.');
  const [warning, setWarning] = useState('');
  const [checkedOut, setCheckedOut] = useState(false);

  const summary = useMemo(() => getCartSummary(cartLines, STARTING_BUDGET), [cartLines]);

  function handleAddProduct(product: Product) {
    const result = addProductToCart(cartLines, product, STARTING_BUDGET);
    setCartLines(result.lines);
    setNotice(result.message);
    setWarning(result.accepted ? '' : result.message);
    setCheckedOut(false);
  }

  function handleRemoveOne(productId: string) {
    const nextLines = removeOneFromCart(cartLines, productId);
    setCartLines(nextLines);
    setNotice('장바구니 수량을 다시 계산했어요.');
    setWarning('');
    setCheckedOut(false);
  }

  function handleClearCart() {
    setCartLines(clearCart(cartLines));
    setNotice('장바구니를 비웠어요.');
    setWarning('');
    setCheckedOut(false);
  }

  function handleCheckout() {
    setCheckedOut(true);
    setNotice('선택 결과를 확인했어요.');
    setWarning('');
  }

  return (
    <main className="app-shell">
      <BudgetBar budget={STARTING_BUDGET} spent={summary.total} remaining={summary.remaining} />

      <p className="live-message" role="status" aria-live="polite">
        {notice}
      </p>

      {warning ? (
        <p className="warning-message" role="alert">
          <AlertTriangle aria-hidden="true" size={18} />
          {warning}
        </p>
      ) : null}

      <div className="market-layout">
        <ProductGrid products={products} onAddProduct={handleAddProduct} />
        <CartPanel
          lines={summary.lines}
          total={summary.total}
          itemCount={summary.itemCount}
          onRemoveOne={handleRemoveOne}
          onClear={handleClearCart}
          onCheckout={handleCheckout}
        />
      </div>

      {checkedOut ? <ReflectionPanel summary={summary} /> : null}
    </main>
  );
}
```

- [ ] **Step 8: Run app tests**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: PASS for all four app tests.

- [ ] **Step 9: Commit interactive app layer**

Run:

```bash
git add src/App.tsx src/App.test.tsx src/components/BudgetBar.tsx src/components/ProductGrid.tsx src/components/CartPanel.tsx src/components/ReflectionPanel.tsx
git commit -m "feat: build classroom flea market flow"
```

Expected: one feature commit is created.

## Task 4: Responsive Classroom Styling

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Replace temporary styles with responsive UI styles**

Replace `src/styles.css`:

```css
:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #18212f;
  background: #f7f2e8;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background:
    linear-gradient(90deg, rgba(0, 117, 128, 0.08) 1px, transparent 1px),
    linear-gradient(180deg, rgba(0, 117, 128, 0.08) 1px, transparent 1px),
    #f7f2e8;
  background-size: 28px 28px;
}

button {
  font: inherit;
}

.app-shell {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 40px;
}

.budget-bar {
  display: grid;
  gap: 16px;
  padding: 20px;
  border: 2px solid #18212f;
  border-radius: 8px;
  background: #fffdf8;
  box-shadow: 6px 6px 0 #18212f;
}

.budget-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.subject-chip,
.need-tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 800;
}

.subject-chip {
  color: #fffdf8;
  background: #007580;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  font-size: clamp(1.55rem, 3vw, 2.4rem);
  line-height: 1.15;
}

h2 {
  font-size: 1.15rem;
}

.wallet-summary {
  display: grid;
  grid-template-columns: auto repeat(3, minmax(120px, 1fr));
  align-items: center;
  gap: 12px;
}

.wallet-summary > div {
  display: grid;
  gap: 3px;
}

.wallet-summary span {
  color: #526070;
  font-size: 0.85rem;
  font-weight: 700;
}

.wallet-summary strong,
.wallet-summary output {
  color: #18212f;
  font-size: 1.25rem;
  font-weight: 900;
}

.budget-meter {
  height: 12px;
  overflow: hidden;
  border: 2px solid #18212f;
  border-radius: 999px;
  background: #ffe4b3;
}

.budget-meter span {
  display: block;
  height: 100%;
  background: #20a39e;
  transition: width 180ms ease;
}

.live-message,
.warning-message {
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: 8px;
  font-weight: 800;
}

.live-message {
  border: 2px solid #b6d9c7;
  background: #eef9f2;
}

.warning-message {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px solid #d95030;
  color: #7a230f;
  background: #ffe7dd;
}

.market-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 20px;
  margin-top: 20px;
  align-items: start;
}

.product-section,
.cart-panel,
.reflection-panel {
  border: 2px solid #18212f;
  border-radius: 8px;
  background: #fffdf8;
}

.product-section,
.cart-panel {
  padding: 18px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.section-title span {
  color: #526070;
  font-size: 0.9rem;
  font-weight: 800;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.product-card {
  display: grid;
  min-height: 172px;
  gap: 10px;
  padding: 14px;
  border: 2px solid #18212f;
  border-radius: 8px;
  color: inherit;
  text-align: left;
  background: #ffffff;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.product-card:hover,
.product-card:focus-visible {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 #18212f;
  outline: none;
}

.product-visual {
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  border: 2px solid #18212f;
  border-radius: 8px;
  color: #18212f;
  font-size: 1.3rem;
  font-weight: 900;
}

.pencil,
.note,
.eraser {
  background: #ffd166;
}

.snack,
.juice {
  background: #ef767a;
}

.blocks,
.yo-yo,
.sticker {
  background: #8ecae6;
}

.bag,
.water {
  background: #95d5b2;
}

.product-meta {
  display: grid;
  gap: 4px;
}

.product-meta strong {
  font-size: 1rem;
}

.product-meta span {
  color: #526070;
  font-size: 0.86rem;
  font-weight: 700;
}

.product-bottom {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
}

.need-tag.required {
  color: #083d3f;
  background: #c7f3e5;
}

.need-tag.optional {
  color: #5b2a00;
  background: #ffe0a6;
}

.product-bottom b {
  justify-self: end;
  font-size: 1.04rem;
}

.cart-panel {
  position: sticky;
  top: 16px;
}

.empty-cart {
  display: flex;
  align-items: center;
  min-height: 96px;
  gap: 8px;
  color: #526070;
  font-weight: 800;
}

.cart-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cart-line {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto auto;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #d8d0bd;
  border-radius: 8px;
  background: #fffaf0;
}

.cart-line div {
  display: grid;
  gap: 3px;
}

.cart-line span {
  color: #526070;
  font-size: 0.82rem;
  font-weight: 700;
}

.quantity {
  min-width: 34px;
  text-align: center;
}

.icon-button,
.secondary-action,
.primary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid #18212f;
  border-radius: 8px;
  font-weight: 900;
  cursor: pointer;
}

.icon-button {
  width: 36px;
  height: 36px;
  color: #18212f;
  background: #fff;
}

.cart-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 2px solid #18212f;
  font-size: 1.1rem;
}

.cart-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 14px;
}

.secondary-action,
.primary-action {
  min-height: 44px;
  padding: 8px 10px;
}

.secondary-action {
  background: #fff;
}

.primary-action {
  color: #fffdf8;
  background: #007580;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.reflection-panel {
  display: grid;
  gap: 12px;
  margin-top: 20px;
  padding: 18px;
  background: #f1fbf7;
}

.reflection-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reflection-prompts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.reflection-prompts span {
  min-height: 56px;
  padding: 10px;
  border: 1px solid #9bc8b2;
  border-radius: 8px;
  background: #ffffff;
  font-weight: 800;
}

@media (max-width: 860px) {
  .app-shell {
    width: min(100% - 20px, 720px);
    padding-top: 12px;
  }

  .wallet-summary {
    grid-template-columns: auto 1fr;
  }

  .market-layout {
    grid-template-columns: 1fr;
  }

  .cart-panel {
    position: static;
  }

  .reflection-prompts {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .budget-bar,
  .product-section,
  .cart-panel,
  .reflection-panel {
    padding: 14px;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .cart-line {
    grid-template-columns: 1fr auto;
  }

  .cart-line b {
    grid-column: 1;
  }

  .icon-button {
    grid-column: 2;
    grid-row: 1 / span 2;
  }

  .cart-actions {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Run unit and component tests after styling**

Run:

```bash
npm test
```

Expected: PASS for `src/lib/cart.test.ts` and `src/App.test.tsx`.

- [ ] **Step 3: Build after styling**

Run:

```bash
npm run build
```

Expected: PASS and `dist/` is generated.

- [ ] **Step 4: Commit styling**

Run:

```bash
git add src/styles.css
git commit -m "style: polish classroom flea market layout"
```

Expected: one styling commit is created.

## Task 5: Documentation and Classroom Handoff

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

Create `README.md`:

```markdown
# 왁자지껄 우리 반 알뜰 시장

영어 프로젝트명: **Smart Flea Market Simulator**

3-4학년군 사회와 수학을 연결한 교실용 장바구니 시뮬레이터입니다. 학생은 10,000원의 예산 안에서 학용품, 간식, 놀이, 생활 물건을 고르며 합리적 소비와 실생활 화폐 계산을 함께 연습합니다.

## 성취기준

- [4사07-02] 자원의 희소성으로 인해 경제활동에서 선택의 문제가 발생함을 파악하고, 합리적 소비 방법을 탐색한다.
- [4수01-04] 세 자리 수의 덧셈과 뺄셈의 계산 원리를 이해하고 그 계산을 할 수 있다.

## 주요 기능

- 시작 예산 10,000원 표시
- 500원-3,000원 상품 10개 카드형 목록
- 상품 클릭 시 장바구니 추가와 남은 예산 자동 계산
- 예산 초과 선택 차단과 경고 메시지
- 장바구니 한 개 빼기, 전체 비우기, 결제하기
- 결제 후 필수/선택 물건 개수와 남은 돈 성찰

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://127.0.0.1:5173`을 엽니다.

## 검증

```bash
npm test
npm run build
```

## 수업 활용

1. 학생에게 예산 10,000원 안에서 필요한 물건을 먼저 고르게 합니다.
2. 장바구니 합계와 남은 예산을 읽고 덧셈/뺄셈 과정을 말로 설명하게 합니다.
3. 예산 부족 경고가 나오면 어떤 물건을 빼거나 바꿀지 짝과 이야기하게 합니다.
4. 결제 후 성찰 문장을 보고 필수 소비와 선택 소비를 구분하게 합니다.

## 브라우저 QA 체크

- 데스크톱 폭에서 상품 그리드와 장바구니가 나란히 보입니다.
- 모바일 폭에서 상품 목록과 장바구니가 한 열로 쌓입니다.
- 상품을 여러 번 클릭하면 수량과 합계가 함께 바뀝니다.
- 예산을 넘는 상품은 장바구니에 들어가지 않고 경고가 보입니다.
- 결제하기 후 소비 선택 돌아보기 영역이 나타납니다.
```

- [ ] **Step 2: Run all verification commands**

Run:

```bash
npm test
npm run build
```

Expected: both commands exit with code 0.

- [ ] **Step 3: Commit docs**

Run:

```bash
git add README.md
git commit -m "docs: add classroom usage guide"
```

Expected: one documentation commit is created.

## Task 6: Browser Smoke Test

**Files:**
- No file changes

- [ ] **Step 1: Start local dev server**

Run:

```bash
npm run dev
```

Expected: Vite prints a local URL such as `http://127.0.0.1:5173/`.

- [ ] **Step 2: Verify desktop layout in Browser**

Open `http://127.0.0.1:5173/` at a desktop viewport.

Expected:
- The first screen is the actual flea market tool, not a landing page.
- Header shows `왁자지껄 우리 반 알뜰 시장`.
- `내 지갑 10,000원`, `쓴 돈 0원`, `남은 예산 10,000원` are visible.
- Product grid and cart panel do not overlap.

- [ ] **Step 3: Verify core interactions in Browser**

Click:
- `색연필 세트`
- `공책 세트`
- `결제하기`

Expected:
- `쓴 돈` becomes `2,700원`.
- `남은 예산` becomes `7,300원`.
- `소비 선택 돌아보기` appears.
- Reflection text includes `필수 물건 2개, 선택 물건 0개를 골랐어요.`

- [ ] **Step 4: Verify budget warning in Browser**

Click `장바구니 비우기`, then click `미니 블록` four times.

Expected:
- The fourth click shows `예산이 부족해요! 합리적 소비를 위해 다시 고민해 볼까요?`
- Cart keeps `미니 블록` at `3개`.
- `남은 예산` remains `1,000원`.

- [ ] **Step 5: Verify mobile layout in Browser**

Set viewport near `390 x 844`.

Expected:
- No horizontal page overflow.
- Product cards are one column.
- Cart controls remain tappable and text stays inside buttons.

## Self-Review

**Spec coverage:** The plan covers the 10,000원 wallet, 10 product cards priced 500원-3,000원, click-to-cart behavior, live subtraction, over-budget warning, checkout button, and social/math reflection flow.

**Placeholder scan:** 빈칸으로 남겨 둔 구현 지시나 정의되지 않은 미래 작업은 없다.

**Type consistency:** `Product`, `CartLine`, `CartSummary`, `addProductToCart`, `removeOneFromCart`, and `getCartSummary` are introduced in Task 2 and used with the same names in Task 3.

## Execution Options

Plan complete and saved to `docs/superpowers/plans/2026-05-11-smart-flea-market-simulator.md`.

1. **Subagent-Driven (recommended)** - Dispatch a fresh subagent per task and review between tasks. Per `AGENTS.md`, implementation subagents should use `GPT-5.3-Codex-Spark` when available; the orchestrator and review agent stay on the main model.
2. **Inline Execution** - Execute tasks in this session using `superpowers:executing-plans`, with checkpoints after each task.
