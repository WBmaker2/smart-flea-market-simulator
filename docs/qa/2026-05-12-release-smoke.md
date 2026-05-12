# 2026-05-12 Release Smoke

## Local Verification

- `npm test`: 통과, 2개 테스트 파일 / 12개 테스트
- `npm run build`: 통과, Vite production build 생성
- `git diff --check`: 통과

## Browser Smoke

- Local preview URL: `http://127.0.0.1:4173/smart-flea-market-simulator/`
- Public URL: `https://wbmaker2.github.io/smart-flea-market-simulator/`
- 데스크톱 브라우저 확인:
  - 제목 `왁자지껄 우리 반 알뜰 시장` 렌더링 확인
  - 상품 클릭 후 장바구니 합계와 남은 예산 갱신 확인
  - `필수 물건 2개 이상` 미션이 `도전 중`에서 `달성`으로 변경됨 확인
- 모바일 390px 확인:
  - `documentElement.scrollWidth === documentElement.clientWidth`
  - 미션 카드가 한 열로 쌓이며 가로 overflow 없음

## GitHub Pages

- Repository: `https://github.com/WBmaker2/smart-flea-market-simulator`
- Workflow run: `https://github.com/WBmaker2/smart-flea-market-simulator/actions/runs/25724995474`
- Workflow conclusion: `success`
- Pages URL: `https://wbmaker2.github.io/smart-flea-market-simulator/`
- Public HTML: `HTTP/2 200`
- Public JS asset: `HTTP/2 200`
- Public CSS asset: `HTTP/2 200`
- Public favicon: `HTTP/2 200`

## HVC Status

- Admin login page reached: `https://hongs-vibe-coding-lab.vercel.app/admin/login`
- Registration status: completed
- Admin card:
  - Title: `왁자지껄 우리 반 알뜰 시장`
  - Tags: `사회`, `수학`, `경제교육`, `화폐계산`, `합리적소비`
  - Thumbnail mode: direct upload
  - App count after save: `37개 앱`
- Static gallery sync:
  - HVC repo commit: `e3ad773 chore: sync smart flea market app card`
  - DB apps: `37`
  - Snapshot apps: `37`
  - Missing/extra/mismatch counts: `0 / 0 / 0`
  - Thumbnail stats: local `37`, remote `0`, null `0`
- HVC production deploy:
  - Deployment id: `dpl_5T3sbDeTnZGWpT2nyswwD7gdUSrD`
  - Ready state: `READY`
  - Public URL: `https://hongs-vibe-coding-lab.vercel.app/`
  - Custom URL: `https://www.vibehong.shop/`
- Public HVC browser verification:
  - Card count: `37`
  - New card visible: `왁자지껄 우리 반 알뜰 시장`
  - App link: `https://wbmaker2.github.io/smart-flea-market-simulator/`
  - Thumbnail: `/app-thumbnails/2c47b201-4941-4d74-a5b0-bb84d696e01c.png`
  - Card images using `/app-thumbnails/`: `37`
  - Card images using `/_next/image`: `0`
  - Horizontal overflow: `0`

## Notes

- GitHub Actions completed with a Node.js action runtime deprecation warning from GitHub-hosted actions. The deployment itself succeeded and the public page/assets returned `200`.
- HVC admin authentication reused an active admin session, so the provided password was not entered or stored.
