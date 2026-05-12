import { Printer } from 'lucide-react';
import { formatWon, type CartSummary } from '../lib/cart';

type WorksheetPanelProps = {
  summary: CartSummary;
};

export function WorksheetPanel({ summary }: WorksheetPanelProps) {
  const equation = `10,000원 - ${formatWon(summary.total)} = ${formatWon(summary.remaining)}`;

  return (
    <section className="worksheet-panel" aria-labelledby="worksheet-heading" role="region">
      <div className="section-title">
        <div>
          <h2 id="worksheet-heading">학생 활동지</h2>
          <p>고른 물건과 남은 돈을 정리하고 합리적 소비 이유를 적어요.</p>
        </div>
        <button
          className="secondary-action print-action"
          type="button"
          onClick={() => window.print()}
        >
          <Printer aria-hidden="true" size={18} />
          활동지 인쇄
        </button>
      </div>

      <div className="worksheet-grid">
        <article>
          <h3>내가 고른 물건</h3>
          {summary.lines.length > 0 ? (
            <ul className="worksheet-list">
              {summary.lines.map((line) => (
                <li key={line.product.id}>
                  <span>{line.product.name}</span>
                  <b>
                    {formatWon(line.product.price)} x {line.quantity}
                  </b>
                </li>
              ))}
            </ul>
          ) : (
            <p className="worksheet-empty">아직 고른 물건이 없어요.</p>
          )}
        </article>

        <article>
          <h3>계산하기</h3>
          <p className="worksheet-equation">{equation}</p>
          <p>필수 물건 {summary.needsCount}개, 선택 물건 {summary.wantsCount}개</p>
        </article>

        <article className="worksheet-lines">
          <h3>생각 쓰기</h3>
          <p>꼭 필요했던 물건:</p>
          <span aria-hidden="true" />
          <p>다시 고른다면 바꿀 물건:</p>
          <span aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}
