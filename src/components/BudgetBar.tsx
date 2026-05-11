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
          <span aria-label="쓴 돈">{formatWon(spent)}</span>
        </div>
        <div>
          <span>남은 예산</span>
          <span aria-label="남은 예산">{formatWon(remaining)}</span>
        </div>
      </div>
      <div className="budget-meter" aria-hidden="true">
        <span style={{ width: `${remainingPercent}%` }} />
      </div>
    </header>
  );
}
