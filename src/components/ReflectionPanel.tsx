import { CheckCircle2 } from 'lucide-react';
import { formatWon, type CartSummary } from '../lib/cart';

type ReflectionPanelProps = {
  summary: CartSummary;
  reflectionReason: string;
  reflectionTag: '필수 소비' | '선택 소비' | '절약 소비';
  presentationReady: boolean;
  onReflectionReasonChange: (nextReason: string) => void;
  onReflectionTagChange: (nextTag: '필수 소비' | '선택 소비' | '절약 소비') => void;
  onPresentationReady: () => void;
};

export function ReflectionPanel({
  summary,
  reflectionReason,
  reflectionTag,
  presentationReady,
  onReflectionReasonChange,
  onReflectionTagChange,
  onPresentationReady
}: ReflectionPanelProps) {
  if (summary.itemCount === 0) {
    return null;
  }

  const reflectionTags: Array<'필수 소비' | '선택 소비' | '절약 소비'> = [
    '필수 소비',
    '선택 소비',
    '절약 소비'
  ];

  const canMakePresentation = reflectionReason.trim().length > 0;

  return (
    <section className="reflection-panel" aria-labelledby="reflection-heading" role="region">
      <div className="reflection-title">
        <CheckCircle2 aria-hidden="true" size={22} />
        <h2 id="reflection-heading">소비 선택 돌아보기</h2>
      </div>
      <p>필수 물건 {summary.needsCount}개, 선택 물건 {summary.wantsCount}개를 골랐어요.</p>
      <p>남은 돈은 {formatWon(summary.remaining)}이에요.</p>
      <div className="reflection-form">
        <label htmlFor="reflection-reason">선택 이유</label>
        <textarea
          id="reflection-reason"
          className="reason-input"
          aria-label="선택 이유"
          value={reflectionReason}
          onChange={(event) => onReflectionReasonChange(event.target.value)}
          rows={3}
        />
        <div className="tag-options">
          {reflectionTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag-button ${reflectionTag === tag ? 'is-selected' : ''}`.trim()}
              onClick={() => onReflectionTagChange(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="primary-action"
          onClick={onPresentationReady}
          disabled={!canMakePresentation}
        >
          발표 카드 만들기
        </button>
      </div>
      {presentationReady ? (
        <section className="presentation-card" role="region" aria-label="발표 카드">
          <p>{reflectionTag}</p>
          <p>{reflectionReason}</p>
          <p>총 구매액 {formatWon(summary.total)}</p>
          <p>남은 돈 {formatWon(summary.remaining)}</p>
          <p>선택 품목 {summary.itemCount}개</p>
        </section>
      ) : null}
      <div className="reflection-prompts">
        <span>필요한 물건을 먼저 골랐나요?</span>
        <span>남은 돈으로 다음 선택을 할 수 있나요?</span>
        <span>다시 고른다면 어떤 물건을 바꾸고 싶나요?</span>
      </div>
    </section>
  );
}
