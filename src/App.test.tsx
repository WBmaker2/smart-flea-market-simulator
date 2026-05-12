import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

describe('Smart Flea Market Simulator', () => {
  it('starts with 10,000 won and subtracts selected products in real time', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: '왁자지껄 우리 반 알뜰 시장' })).toBeInTheDocument();
    expect(screen.getByLabelText('남은 예산')).toHaveTextContent('10,000원');

    await user.click(
      screen.getByRole('button', { name: /색연필 세트 학용품 필수 1,500원 담기/ })
    );
    await user.click(screen.getByRole('button', { name: /공책 세트 학용품 필수 1,200원 담기/ }));

    expect(screen.getByLabelText('쓴 돈')).toHaveTextContent('2,700원');
    expect(screen.getByLabelText('남은 예산')).toHaveTextContent('7,300원');
    expect(screen.getByRole('status')).toHaveTextContent('공책 세트 장바구니에 담았어요.');
  });

  it('shows an alert and keeps the cart unchanged when a choice exceeds the budget', async () => {
    const user = userEvent.setup();
    render(<App />);

    for (let index = 0; index < 3; index += 1) {
      await user.click(screen.getByRole('button', { name: /미니 블록 놀이 선택 3,000원 담기/ }));
    }
    await user.click(screen.getByRole('button', { name: /물병 생활 필수 2,800원 담기/ }));

    expect(screen.getByRole('alert')).toHaveTextContent('예산이 부족해요! 합리적 소비를 위해 다시 고민해 볼까요?');
    expect(screen.getByRole('status')).not.toHaveTextContent('예산이 부족해요! 합리적 소비를 위해 다시 고민해 볼까요?');
    expect(screen.getByLabelText('남은 예산')).toHaveTextContent('1,000원');
    const cart = screen.getByRole('complementary', { name: '장바구니' });
    expect(within(cart).getByText('미니 블록')).toBeInTheDocument();
    expect(within(cart).queryByText('물병')).not.toBeInTheDocument();
  });

  it('removes items, resets the cart, and disables checkout when empty', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /색연필 세트 학용품 필수 1,500원 담기/ })
    );
    await user.click(
      screen.getByRole('button', { name: /색연필 세트 학용품 필수 1,500원 담기/ })
    );
    await user.click(screen.getByRole('button', { name: /색연필 세트 한 개 빼기/ }));

    const cart = screen.getByRole('complementary', { name: '장바구니' });
    const pencilRow = within(cart).getByText('색연필 세트').closest('li');
    expect(pencilRow).toBeTruthy();
    expect(within(pencilRow as HTMLElement).getByText('1,500원 x 1')).toBeInTheDocument();
    expect(within(pencilRow as HTMLElement).getByText('1,500원')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '장바구니 비우기' }));

    expect(within(cart).getByText('아직 고른 물건이 없어요.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '결제하기' })).toBeDisabled();
    expect(screen.getByLabelText('남은 예산')).toHaveTextContent('10,000원');
  });

  it('opens a rational-consumption reflection after checkout', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /색연필 세트 학용품 필수 1,500원 담기/ })
    );
    await user.click(screen.getByRole('button', { name: /쌀과자 간식 선택 800원 담기/ }));
    await user.click(screen.getByRole('button', { name: '결제하기' }));

    const reflection = screen.getByRole('region', { name: '소비 선택 돌아보기' });
    expect(within(reflection).getByText('필수 물건 1개, 선택 물건 1개를 골랐어요.')).toBeInTheDocument();
    expect(within(reflection).getByText('남은 돈은 7,700원이에요.')).toBeInTheDocument();
  });

  it('shows mission cards and updates completion status after shopping', async () => {
    const user = userEvent.setup();
    render(<App />);

    const missionPanel = screen.getByRole('region', { name: '미션 카드' });
    expect(within(missionPanel).getByText('필수 물건 2개 이상')).toBeInTheDocument();
    expect(within(missionPanel).getByText('3,000원 이상 남기기')).toBeInTheDocument();
    expect(within(missionPanel).getByText('선택 물건 1개 이하')).toBeInTheDocument();
    expect(within(missionPanel).getByText('필수 물건 2개 이상').closest('li')).toHaveTextContent('도전 중');

    await user.click(
      screen.getByRole('button', { name: /색연필 세트 학용품 필수 1,500원 담기/ })
    );
    await user.click(
      screen.getByRole('button', { name: /공책 세트 학용품 필수 1,200원 담기/ })
    );

    expect(within(missionPanel).getByText('필수 물건 2개 이상').closest('li')).toHaveTextContent('달성');
    expect(within(missionPanel).getByText('3,000원 이상 남기기').closest('li')).toHaveTextContent('달성');
    expect(within(missionPanel).getByText('선택 물건 1개 이하').closest('li')).toHaveTextContent('달성');
  });

  it('renders a printable student worksheet and prints when requested', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /색연필 세트 학용품 필수 1,500원 담기/ })
    );
    await user.click(
      screen.getByRole('button', { name: /공책 세트 학용품 필수 1,200원 담기/ })
    );

    const worksheet = screen.getByRole('region', { name: '학생 활동지' });
    expect(within(worksheet).getByText('내가 고른 물건')).toBeInTheDocument();
    expect(within(worksheet).getByText('색연필 세트')).toBeInTheDocument();
    expect(within(worksheet).getByText('공책 세트')).toBeInTheDocument();
    expect(within(worksheet).getByText('10,000원 - 2,700원 = 7,300원')).toBeInTheDocument();

    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    await user.click(within(worksheet).getByRole('button', { name: '활동지 인쇄' }));
    expect(printSpy).toHaveBeenCalledTimes(1);
    printSpy.mockRestore();
  });

  it('creates a reflection presentation card with reason and clears it after cart changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /색연필 세트 학용품 필수 1,500원 담기/ })
    );
    await user.click(screen.getByRole('button', { name: /공책 세트 학용품 필수 1,200원 담기/ }));
    await user.click(screen.getByRole('button', { name: '결제하기' }));

    await user.type(
      screen.getByLabelText('선택 이유'),
      '공부에 필요한 물건을 먼저 골랐습니다.'
    );
    await user.click(screen.getByRole('button', { name: '절약 소비' }));
    await user.click(screen.getByRole('button', { name: '발표 카드 만들기' }));

    const card = screen.getByRole('region', { name: '발표 카드' });
    expect(card).toHaveTextContent('절약 소비');
    expect(card).toHaveTextContent('공부에 필요한 물건을 먼저 골랐습니다.');
    expect(card).toHaveTextContent('남은 돈 7,300원');
    expect(screen.getByRole('button', { name: '절약 소비' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(
      screen.getByRole('button', { name: /물병 생활 필수 2,800원 담기/ })
    );

    expect(screen.queryByRole('region', { name: '발표 카드' })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: '소비 선택 돌아보기' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '결제하기' }));

    expect(screen.getByLabelText('선택 이유')).toHaveValue('');
    expect(screen.getByRole('button', { name: '필수 소비' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: '발표 카드 만들기' })).toBeDisabled();
  });

  it('keeps the presentation card when adding an item over budget fails', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /색연필 세트 학용품 필수 1,500원 담기/ })
    );
    await user.click(screen.getByRole('button', { name: /공책 세트 학용품 필수 1,200원 담기/ }));
    await user.click(screen.getByRole('button', { name: /미니 블록 놀이 선택 3,000원 담기/ }));
    await user.click(screen.getByRole('button', { name: /과일 주스 간식 선택 1,000원 담기/ }));
    await user.click(screen.getByRole('button', { name: /스티커북 놀이 선택 2,200원 담기/ }));
    await user.click(screen.getByRole('button', { name: '결제하기' }));

    await user.type(screen.getByLabelText('선택 이유'), '아무 이유나 적어봅니다.');
    await user.click(screen.getByRole('button', { name: '절약 소비' }));
    await user.click(screen.getByRole('button', { name: '발표 카드 만들기' }));

    const cardBeforeFail = screen.getByRole('region', { name: '발표 카드' });
    expect(cardBeforeFail).toBeInTheDocument();
    expect(screen.getByLabelText('선택 이유')).toHaveValue('아무 이유나 적어봅니다.');
    expect(screen.getByRole('button', { name: '발표 카드 만들기' })).not.toBeDisabled();

    await user.click(screen.getByRole('button', { name: /물병 생활 필수 2,800원 담기/ }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      '예산이 부족해요! 합리적 소비를 위해 다시 고민해 볼까요?'
    );
    expect(screen.getByRole('region', { name: '발표 카드' })).toBeInTheDocument();
    expect(screen.getByLabelText('선택 이유')).toHaveValue('아무 이유나 적어봅니다.');
  });

  it('hides the presentation card when reason is emptied or whitespace', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /색연필 세트 학용품 필수 1,500원 담기/ })
    );
    await user.click(screen.getByRole('button', { name: /공책 세트 학용품 필수 1,200원 담기/ }));
    await user.click(screen.getByRole('button', { name: '결제하기' }));

    await user.type(screen.getByLabelText('선택 이유'), '기록용 이유입니다.');
    await user.click(screen.getByRole('button', { name: '발표 카드 만들기' }));
    expect(screen.getByRole('region', { name: '발표 카드' })).toBeInTheDocument();

    const reason = screen.getByLabelText('선택 이유');
    await user.clear(reason);
    await user.type(reason, '   ');

    expect(screen.queryByRole('region', { name: '발표 카드' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '발표 카드 만들기' })).toBeDisabled();
  });

  it('renders a classroom teacher guide with grade standards and time blocks', () => {
    render(<App />);

    const guide = screen.getByRole('region', { name: '교사용 수업안' });
    expect(within(guide).getByText('20분 빠른 활동')).toBeInTheDocument();
    expect(within(guide).getByText('40분 전체 수업')).toBeInTheDocument();
    expect(within(guide).getByText('[4사07-02]')).toBeInTheDocument();
    expect(within(guide).getByText('[4수01-04]')).toBeInTheDocument();
  });
});
