# Classroom Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the full classroom-use package for Smart Flea Market Simulator: printable student worksheet, consumer-reason presentation card, and teacher lesson guide.

**Architecture:** Keep the shopping simulator as a single-page React app, but split classroom surfaces into focused components. `App.tsx` owns shopping/reflection state, classroom components render derived summaries, and static teaching materials live under `docs/classroom/`.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, CSS print media.

---

## File Structure

- Create `src/components/WorksheetPanel.tsx`: printable student worksheet tied to current cart state.
- Modify `src/App.tsx`: render worksheet and pass current cart summary/lines.
- Modify `src/App.test.tsx`: cover worksheet content and print action.
- Modify `src/styles.css`: worksheet layout and print styles.
- Create `src/components/ReflectionPanel.tsx` changes: add controlled reason input, spending tag selection, and presentation card.
- Modify `src/App.tsx`: own reflection state and reset it when cart changes.
- Modify `src/App.test.tsx`: cover reason/tag/card behavior.
- Create `src/components/TeacherGuidePanel.tsx`: compact in-app 20-minute/40-minute teacher guide.
- Create `docs/classroom/student-activity-sheet.md`: printable student activity sheet text.
- Create `docs/classroom/teacher-guide.md`: complete teacher guide with achievement standards, flow, prompts, assessment.
- Modify `README.md`: document the new classroom package.
- Modify `src/styles.css`: guide/reflection controls and mobile responsiveness.

---

### Task 1: Printable Student Worksheet

**Files:**
- Create: `src/components/WorksheetPanel.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`
- Create: `docs/classroom/student-activity-sheet.md`

- [ ] **Step 1: Add failing tests**

Add a test to `src/App.test.tsx` that selects two products and verifies a worksheet region exists with:

```tsx
const worksheet = screen.getByRole('region', { name: '학생 활동지' });
expect(within(worksheet).getByText('내가 고른 물건')).toBeInTheDocument();
expect(within(worksheet).getByText('색연필 세트')).toBeInTheDocument();
expect(within(worksheet).getByText('공책 세트')).toBeInTheDocument();
expect(within(worksheet).getByText('10,000원 - 2,700원 = 7,300원')).toBeInTheDocument();
```

Also mock `window.print` and verify the `활동지 인쇄` button calls it once:

```tsx
const printSpy = vi.spyOn(window, 'print').mockImplementation(() => undefined);
await user.click(within(worksheet).getByRole('button', { name: '활동지 인쇄' }));
expect(printSpy).toHaveBeenCalledTimes(1);
printSpy.mockRestore();
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `npm test -- src/App.test.tsx`

Expected before implementation: FAIL because the worksheet region does not exist.

- [ ] **Step 3: Implement `WorksheetPanel`**

Create `src/components/WorksheetPanel.tsx`:

```tsx
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
        <button className="secondary-action print-action" type="button" onClick={() => window.print()}>
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
                  <b>{formatWon(line.product.price)} x {line.quantity}</b>
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
```

- [ ] **Step 4: Wire it into `App.tsx`**

Import and render `WorksheetPanel` after the market layout so it updates with the same cart summary:

```tsx
import { WorksheetPanel } from './components/WorksheetPanel';
```

```tsx
<WorksheetPanel summary={summary} />
```

- [ ] **Step 5: Add print-friendly CSS**

Add `.worksheet-panel`, `.worksheet-grid`, `.worksheet-list`, `.worksheet-equation`, `.worksheet-lines`, `.print-action` styles. Add a print media block that hides `.budget-bar`, `.live-message`, `.warning-message`, `.mission-panel`, `.market-layout`, `.reflection-panel`, `.teacher-guide-panel`, and `.print-action`, then prints `.worksheet-panel` cleanly on white.

- [ ] **Step 6: Add printable markdown handout**

Create `docs/classroom/student-activity-sheet.md` with sections:
- 이름 / 날짜
- 내가 고른 물건
- 계산식: `10,000원 - (쓴 돈) = 남은 돈`
- 꼭 필요한 물건 / 사고 싶은 물건 구분
- 합리적 소비 자기평가 3문항
- 발표 문장 틀 2개

- [ ] **Step 7: Verify and commit**

Run: `npm test -- src/App.test.tsx`

Expected: PASS.

Commit: `feat: add printable student worksheet`

---

### Task 2: Consumer Reason Presentation Card

**Files:**
- Modify: `src/components/ReflectionPanel.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add failing tests**

Add a test that checks after checkout:

```tsx
await user.type(screen.getByLabelText('선택 이유'), '공부에 필요한 물건을 먼저 골랐습니다.');
await user.click(screen.getByRole('button', { name: '절약 소비' }));
await user.click(screen.getByRole('button', { name: '발표 카드 만들기' }));

const card = screen.getByRole('region', { name: '발표 카드' });
expect(card).toHaveTextContent('절약 소비');
expect(card).toHaveTextContent('공부에 필요한 물건을 먼저 골랐습니다.');
expect(card).toHaveTextContent('남은 돈 7,300원');
```

Also verify that changing the cart after a card exists clears the card and returns the reflection state to a fresh draft.

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `npm test -- src/App.test.tsx`

Expected before implementation: FAIL because the input, tag buttons, and presentation card do not exist.

- [ ] **Step 3: Add controlled reflection state in `App.tsx`**

Add state:

```tsx
const [reflectionReason, setReflectionReason] = useState('');
const [reflectionTag, setReflectionTag] = useState<'필수 소비' | '선택 소비' | '절약 소비'>('필수 소비');
const [presentationReady, setPresentationReady] = useState(false);
```

Whenever `handleAddProduct`, `handleRemoveOne`, or `handleClearCart` changes the cart, clear reflection state:

```tsx
setReflectionReason('');
setReflectionTag('필수 소비');
setPresentationReady(false);
```

Pass state and handlers into `ReflectionPanel`.

- [ ] **Step 4: Expand `ReflectionPanel`**

Keep the existing summary text, then add:
- `<textarea aria-label="선택 이유">`
- three type buttons: `필수 소비`, `선택 소비`, `절약 소비`
- `발표 카드 만들기` button disabled until the reason has non-whitespace text
- `<section role="region" aria-label="발표 카드">` when ready, showing tag, reason, total, remaining, and item count

- [ ] **Step 5: Add CSS**

Add `.reflection-form`, `.reason-input`, `.tag-options`, `.tag-button`, `.tag-button.is-selected`, `.presentation-card`.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- src/App.test.tsx`

Expected: PASS.

Commit: `feat: add consumer reason presentation card`

---

### Task 3: Teacher Guide and Documentation

**Files:**
- Create: `src/components/TeacherGuidePanel.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`
- Create: `docs/classroom/teacher-guide.md`
- Modify: `README.md`

- [ ] **Step 1: Add failing tests**

Add a test that verifies:

```tsx
const guide = screen.getByRole('region', { name: '교사용 수업안' });
expect(within(guide).getByText('20분 빠른 활동')).toBeInTheDocument();
expect(within(guide).getByText('40분 전체 수업')).toBeInTheDocument();
expect(within(guide).getByText('[4사07-02]')).toBeInTheDocument();
expect(within(guide).getByText('[4수01-04]')).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `npm test -- src/App.test.tsx`

Expected before implementation: FAIL because the teacher guide region does not exist.

- [ ] **Step 3: Implement `TeacherGuidePanel`**

Create `src/components/TeacherGuidePanel.tsx` with:
- region label `교사용 수업안`
- achievement standards `[4사07-02]`, `[4수01-04]`
- 20-minute quick flow: 도입 3분, 장보기 10분, 발표 5분, 정리 2분
- 40-minute full lesson: 도입 5분, 모둠 장보기 15분, 활동지 작성 10분, 발표 7분, 정리 3분
- teacher prompts: “예산이 부족할 때 무엇을 먼저 포기해야 할까요?”, “필수 소비와 선택 소비를 어떻게 구분했나요?”

- [ ] **Step 4: Render it in `App.tsx`**

Import and render below `WorksheetPanel`.

- [ ] **Step 5: Write `docs/classroom/teacher-guide.md`**

Include:
- 대상 학년/과목
- 성취기준
- 수업 목표 3개
- 준비물
- 20분/40분 절차
- 교사 발문
- 평가 관찰 포인트
- 수업 후 확장 활동

- [ ] **Step 6: Update `README.md`**

Add a “수업 패키지” section linking:
- `docs/classroom/student-activity-sheet.md`
- `docs/classroom/teacher-guide.md`

Mention the app now includes a printable worksheet, reason-writing presentation card, and teacher guide.

- [ ] **Step 7: Verify and commit**

Run:

```bash
npm test
npm run build
```

Expected: PASS.

Commit: `docs: add teacher guide classroom package`

---

## Final Verification

- [ ] Run `npm test`
- [ ] Run `npm run build`
- [ ] Start preview with `npm run preview -- --host 127.0.0.1`
- [ ] Browser smoke at `/smart-flea-market-simulator/`:
  - select two required products
  - worksheet equation updates
  - checkout opens reason input
  - presentation card appears after entering reason and choosing a tag
  - teacher guide is visible
  - mobile width has no horizontal overflow
- [ ] Record results in `docs/qa/2026-05-12-classroom-package-smoke.md`
- [ ] Final code review for the complete branch
