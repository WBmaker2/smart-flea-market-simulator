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
