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
    setNotice(result.accepted ? result.message : '예산 안에서 다시 골라 보세요.');
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
