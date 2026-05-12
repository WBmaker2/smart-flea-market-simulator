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
- Registration status: pending admin password
- Secret lookup checked without printing values:
  - `/tmp/hvc_prod_env`: not found
  - `/private/tmp/hvc_prod_env`: not found
  - `HVC_ADMIN_PASSWORD`: empty
  - `ADMIN_PASSWORD`: empty
  - `HONGS_VIBE_CODING_LAB_ADMIN_PASSWORD`: empty

## Notes

- GitHub Actions completed with a Node.js action runtime deprecation warning from GitHub-hosted actions. The deployment itself succeeded and the public page/assets returned `200`.
