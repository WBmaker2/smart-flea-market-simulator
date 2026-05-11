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
