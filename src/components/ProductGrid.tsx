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
