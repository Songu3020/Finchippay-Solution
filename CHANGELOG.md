# Changelog

All notable changes to **Finchippay-Solution** are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Full project rename from `stellar-micropay` → `Finchippay-Solution` across all files, docs, scripts, and configs.
- Emergency pause mechanism (circuit breaker) on `FinchippayContract`:
  - Admin-only `pause()` and `unpause()` freeze/resume all value-transferring operations.
  - Read-only functions remain accessible during pause.
  - Pause guard (`require_not_paused`) on all mutating entry-points.
- Contract upgradability via `upgrade(new_wasm_hash)` with version tracking.
- Upper bounds on deposits, rates, timelocks, and signer counts:
  - `MAX_ESCROW_LEDGERS`, `MAX_STREAM_DEPOSIT`, `MAX_STREAM_RATE`
  - `MAX_ESCROW_AMOUNT`, `MAX_MULTISIG_AMOUNT`, `MAX_MULTISIG_SIGNERS`
  - Cumulative top-up cap enforcement in `top_up_stream`
- Contract version constant (`CONTRACT_VERSION`) and `get_version()` query.
- `FinchippayContract` Soroban smart contract rebuild:
  - Streaming payments (`open_stream`, `claim_stream`, `top_up_stream`, `close_stream`)
  - N-of-M multi-sig payment proposals (`create_multisig`, `approve_multisig`, `cancel_multisig`)
  - Time-locked escrow (`create_escrow`, `claim_escrow`, `cancel_escrow`)
  - On-chain tips with aggregate stats (`send_tip`)
  - Immutable payment receipts (`mint_receipt`)
  - Batch fan-out sends (`batch_send`)
  - Full test suite for all features
- Checked arithmetic throughout the contract (overflows panic rather than wrap).
- Storage TTL bumps on every read and write to prevent ledger expiry.
- Enhanced API Swagger docs with streaming/multi-sig/escrow schemas.
- Updated CI workflow to reference `contracts/finchippay-contract`.
- Docker publish workflow updated with `ghcr.io/finchippay/*` image names.

### Changed
- Contract directory renamed: `contracts/stellar-micropay-contract` → `contracts/finchippay-contract`
- Contract struct renamed: `MicroPayContract` → `FinchippayContract`
- All `stellar-micropay.vercel.app` URLs updated to `finchippay.vercel.app`
- GitHub URLs updated to `https://github.com/FinChippay/Finchippay-Solution`

---

## [1.0.0] — 2025-01-01

### Added
- Initial full-stack release: Soroban contract + Next.js frontend + Express backend.
- Freighter wallet integration (non-custodial, keys never leave the browser).
- SEP-0002 federation, SEP-0010 JWT auth.
- Horizon account/payment data proxy with LRU cache and retry logic.
- Analytics dashboard with payment stats, volume charts, and sparklines.
- Recurring payment schedules stored in the browser.
- PWA manifest + service worker for offline support.
- Docker Compose local dev environment.
- GitHub Actions CI (frontend, backend, contracts, Playwright E2E).

[Unreleased]: https://github.com/FinChippay/Finchippay-Solution/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/FinChippay/Finchippay-Solution/releases/tag/v1.0.0
