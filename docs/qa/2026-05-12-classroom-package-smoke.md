# Classroom Package Smoke Test

Date: 2026-05-12

Branch: `codex/classroom-package`

## Automated Checks

```bash
npm test
```

Result: PASS

- Test files: 2 passed
- Tests: 17 passed

```bash
npm run build
```

Result: PASS

- TypeScript build completed
- Vite production build completed

## Browser Smoke

Preview URL:

```text
http://127.0.0.1:4174/smart-flea-market-simulator/
```

Browser: Chromium via Playwright

Flow checked:

1. Open production preview.
2. Add `색연필 세트` and `공책 세트`.
3. Confirm student worksheet equation.
4. Checkout.
5. Enter consumer reason.
6. Select `절약 소비`.
7. Create presentation card.
8. Confirm teacher guide content.
9. Check desktop and 390px mobile horizontal overflow.

Observed results:

- Worksheet equation: `10,000원 - 2,700원 = 7,300원`
- Presentation card contains `절약 소비`
- Presentation card contains the entered reason
- Presentation card contains `남은 돈 7,300원`
- Teacher guide contains `20분 빠른 활동`
- Teacher guide contains `40분 전체 수업`
- Teacher guide contains `[4사07-02]` and `[4수01-04]`
- Desktop horizontal overflow: `0`
- Mobile horizontal overflow at 390px: `0`

Screenshot artifacts, ignored by Git:

- `smart-flea-market-classroom-desktop.png`
- `smart-flea-market-classroom-mobile.png`
