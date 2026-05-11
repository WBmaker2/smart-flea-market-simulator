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

export function CartPanel({
  lines,
  total,
  itemCount,
  onRemoveOne,
  onClear,
  onCheckout
}: CartPanelProps) {
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
                <span>
                  {formatWon(line.product.price)} x {line.quantity}
                </span>
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
