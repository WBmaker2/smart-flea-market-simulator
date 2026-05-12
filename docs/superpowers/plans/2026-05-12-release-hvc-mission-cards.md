# Smart Flea Market Simulator Release, HVC Registration, and Mission Cards Implementation Plan

> **For 홍년님:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to execute this plan step-by-step after it is written.

**Goal:** Finish the next three release-stage improvements for `Smart Flea Market Simulator`: GitHub Pages publication, Hong's Vibe Coding Lab registration, and mission-card classroom extension, while leaving an auditable implementation/verification record.

**Architecture:** Keep the existing Vite + React + TypeScript app. Add a small mission data/component layer that derives achievement states from the existing cart state. Add GitHub Pages deployment workflow and release documentation. Register the final public URL and a real app thumbnail with Hong's Vibe Coding Lab after the live page is verified.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, GitHub Actions Pages deployment, Hong's Vibe Coding Lab admin registration.

---

### Task 1: Add Release/Implementation Record

**Files:**
- Create: `docs/superpowers/plans/2026-05-12-release-hvc-mission-cards.md`
- Later create/update: `docs/qa/2026-05-12-release-smoke.md`
- Later create/update: `docs/hvc/smart-flea-market-simulator-registration.md`

**Step 1: Record implementation order**

Document the practical execution sequence:

1. Prepare deployment workflow and base path.
2. Add mission-card classroom feature.
3. Re-run local test/build/browser smoke on the final app.
4. Publish to GitHub Pages and verify the public URL.
5. Capture the final public screen and register/update the HVC card.

**Step 2: Keep verification evidence**

At the end, write `docs/qa/2026-05-12-release-smoke.md` with:

```md
# 2026-05-12 Release Smoke

- Local tests:
- Production build:
- Browser smoke:
- GitHub Pages workflow:
- Public URL:
- HVC admin/public verification:
```

**Step 3: Keep HVC metadata**

At the end, write `docs/hvc/smart-flea-market-simulator-registration.md` with:

```md
# Hong's Vibe Coding Lab Registration

- Title: Smart Flea Market Simulator
- Korean title: 왁자지껄 우리 반 알뜰 시장
- Subjects: 사회, 수학
- Grade band: 3-4학년군
- Public URL:
- Thumbnail evidence:
- Admin verification:
- Public verification:
```

---

### Task 2: Add Mission Cards Feature

**Files:**
- Create: `src/data/missions.ts`
- Create: `src/components/MissionPanel.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`
- Modify: `README.md`

**Step 1: Define mission model**

Create `src/data/missions.ts`:

```ts
export type MissionTone = 'need' | 'balance' | 'choice'

export type MissionDefinition = {
  id: string
  tone: MissionTone
  title: string
  description: string
}

export const missions: MissionDefinition[] = [
  {
    id: 'essentials',
    tone: 'need',
    title: '필수 물건 2개 이상',
    description: '수업에 꼭 필요한 학용품을 먼저 골라 보세요.',
  },
  {
    id: 'save-3000',
    tone: 'balance',
    title: '3,000원 이상 남기기',
    description: '사고 싶은 것과 남길 돈의 균형을 생각해 보세요.',
  },
  {
    id: 'wants-limit',
    tone: 'choice',
    title: '선택 물건 1개 이하',
    description: '간식과 장난감은 꼭 필요한지 다시 판단해 보세요.',
  },
]
```

**Step 2: Derive mission status from cart state**

In `App.tsx`, compute:

```ts
const essentialCount = cartItems.filter((item) => item.category === '필수').length
const wantCount = cartItems.filter((item) => item.category === '선택').length
const missionStatuses = {
  essentials: essentialCount >= 2,
  'save-3000': remainingBudget >= 3000,
  'wants-limit': wantCount <= 1,
}
```

If current product category names differ, use the existing category values and keep the mission text Korean/classroom-centered.

**Step 3: Render mission panel**

Create `MissionPanel` that receives:

```ts
type MissionPanelProps = {
  completed: Record<string, boolean>
}
```

Expected behavior:

- Each mission appears as a repeated card.
- Completed missions show `달성`.
- Incomplete missions show `도전 중`.
- The panel uses `aria-live="polite"` so mission state changes are announced.
- No independent localStorage or server state is introduced.

**Step 4: Place mission panel in the app**

Place it near the budget summary/cart area so students see the connection between:

- 남은 예산
- 장바구니 선택
- 합리적 소비 미션

**Step 5: Add tests**

Extend `src/App.test.tsx`:

```ts
it('shows rational consumption mission cards', () => {
  render(<App />)

  expect(screen.getByText('필수 물건 2개 이상')).toBeInTheDocument()
  expect(screen.getByText('3,000원 이상 남기기')).toBeInTheDocument()
  expect(screen.getByText('선택 물건 1개 이하')).toBeInTheDocument()
})
```

Add one interaction test that selects products and verifies at least one mission flips to `달성`.

**Step 6: Style responsively**

Add CSS for:

- `.mission-panel`
- `.mission-list`
- `.mission-card`
- `.mission-card.is-complete`
- `.mission-status`

Constraints:

- Mission cards should not cause horizontal overflow at mobile width.
- Radius should stay at or below 8px.
- Text must wrap naturally within cards.

---

### Task 3: Configure GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Modify: `vite.config.ts`
- Modify: `README.md`

**Step 1: Set Vite base for production**

Use the GitHub Pages project path for production builds:

```ts
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/smart-flea-market-simulator/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
  },
}))
```

**Step 2: Add GitHub Pages workflow**

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Step 3: Verify locally**

Run:

```bash
npm test
npm run build
```

Then run a browser smoke on the built or previewed app:

- Product grid renders.
- Cart adds/removes items.
- Budget warning appears when over budget.
- Mission cards update.
- Mobile width has no horizontal overflow.

---

### Task 4: Publish and Verify GitHub Pages

**Files:**
- Modify/create remote repository metadata through GitHub CLI.
- Update: `README.md`
- Update: `docs/qa/2026-05-12-release-smoke.md`

**Step 1: Confirm remote**

If no `origin` exists, create a public GitHub repository:

```bash
gh repo create smart-flea-market-simulator --public --source=. --remote=origin
```

**Step 2: Commit and push**

Push `main`:

```bash
git push -u origin main
```

**Step 3: Enable Pages workflow deployment if needed**

Use GitHub API only if Pages is not already enabled:

```bash
gh api repos/WBmaker2/smart-flea-market-simulator/pages
gh api --method POST repos/WBmaker2/smart-flea-market-simulator/pages -f build_type=workflow
```

**Step 4: Watch workflow and verify public page**

Expected public URL:

```txt
https://wbmaker2.github.io/smart-flea-market-simulator/
```

Verify:

- Workflow succeeds.
- Public HTML returns `200`.
- Hashed CSS/JS assets return `200`.
- App content includes `왁자지껄 우리 반 알뜰 시장`.

---

### Task 5: Register with Hong's Vibe Coding Lab

**Files:**
- Update: `docs/hvc/smart-flea-market-simulator-registration.md`
- Remote admin change: Hong's Vibe Coding Lab app registry

**Step 1: Prepare registration metadata**

Use:

```txt
Title: Smart Flea Market Simulator
Korean title: 왁자지껄 우리 반 알뜰 시장
Category: 사회/수학 융합
Grade: 3-4학년군
Description: 한정된 예산 안에서 물건을 고르고 장바구니 합계를 계산하며 합리적 소비를 연습하는 교실용 알뜰 시장 시뮬레이터입니다.
URL: https://wbmaker2.github.io/smart-flea-market-simulator/
Tags: 사회, 수학, 경제교육, 화폐계산, 합리적소비, 장바구니
```

**Step 2: Capture real thumbnail**

Use the final public page, not a mock:

- Desktop-ish screenshot.
- Must show budget, product grid, cart/mission area.
- Avoid cropped/blank thumbnails.

**Step 3: Register/update admin card**

Use the HVC admin workflow:

- Check for duplicate by URL/title.
- Create or update the existing card.
- Upload/apply thumbnail.
- Save.

**Step 4: Verify admin and public**

Verify:

- Admin card shows correct title, URL, tags, and thumbnail.
- Public HVC page exposes the app card or the current public archive source reflects the update.
- Document any blocker, especially if admin credentials are unavailable.

---

### Task 6: Final Verification and Release Notes

**Files:**
- Update: `README.md`
- Create/update: `docs/qa/2026-05-12-release-smoke.md`
- Update: `docs/hvc/smart-flea-market-simulator-registration.md`

**Step 1: Final checks**

Run:

```bash
npm test
npm run build
```

Verify final browser behavior:

- Initial budget is `10,000원`.
- Product cards are clickable.
- Cart total and remaining budget update.
- Over-budget warning appears.
- Mission cards update from `도전 중` to `달성` where appropriate.

**Step 2: Document final result**

Record:

- Commit hash.
- GitHub Actions run URL or run id.
- Public app URL.
- HVC verification result.
- Any known limitations.

**Step 3: Commit all implementation documents**

Create final commit(s) with clear messages, then report:

- Files changed.
- Commands run.
- Public URLs.
- Any unresolved blocker.
