# Environment Variables — Finchippay-Solution

This document describes every environment variable used by the backend and frontend.

Copy the `.env.example` files and fill in the values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

---

## Backend (`backend/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `STELLAR_NETWORK` | ✅ | — | `testnet` or `mainnet` |
| `HORIZON_URL` | ✅ | — | Stellar Horizon base URL |
| `JWT_SECRET` | ✅ | — | Secret for SEP-0010 JWT signing (min 32 chars) |
| `ALLOWED_ORIGINS` | ✅ | — | Comma-separated list of CORS-allowed origins |
| `PORT` | ❌ | `4000` | HTTP port to listen on |
| `NODE_ENV` | ❌ | `development` | `development`, `test`, or `production` |
| `SENTRY_DSN` | ❌ | — | Sentry DSN for error tracking (disabled if unset) |
| `FEDERATION_DOMAIN` | ❌ | — | Domain used in SEP-0002 TOML discovery |
| `FEDERATION_SERVER_URL` | ❌ | — | Override federation server URL |
| `TURRETS_PORT` | ❌ | `4100` | Port for the Turrets side-server |

### Example `backend/.env`

```env
STELLAR_NETWORK=testnet
HORIZON_URL=https://horizon-testnet.stellar.org
JWT_SECRET=change-me-to-a-long-random-secret
ALLOWED_ORIGINS=http://localhost:3000,https://finchippay.vercel.app
PORT=4000
NODE_ENV=development
```

---

## Frontend (`frontend/.env.local`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_STELLAR_NETWORK` | ✅ | — | `testnet` or `mainnet` |
| `NEXT_PUBLIC_HORIZON_URL` | ✅ | — | Stellar Horizon base URL |
| `NEXT_PUBLIC_API_URL` | ✅ | — | Backend API base URL |
| `NEXT_PUBLIC_CONTRACT_ID` | ❌ | — | Deployed `FinchippayContract` contract ID |
| `NEXT_PUBLIC_SOROBAN_RPC_URL` | ❌ | — | Soroban RPC endpoint |
| `NEXT_PUBLIC_SENTRY_DSN` | ❌ | — | Sentry DSN for client-side error tracking |

### Example `frontend/.env.local`

```env
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CONTRACT_ID=CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

---

## Production Notes

- `JWT_SECRET` must be at least 32 random characters. Generate one with:
  ```bash
  openssl rand -hex 32
  ```
- `ALLOWED_ORIGINS` should list only your actual frontend domain(s). Wildcards are not supported.
- Never commit real `.env` files to git. They are listed in `.gitignore`.
- In Docker / CI, inject secrets via environment variables or a secrets manager — not via files.
