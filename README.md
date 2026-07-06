# LightDex App (Next.js)

Community DEX frontend for LightDex — forked from [lightchain-protocol/lightchain-dex](https://github.com/lightchain-protocol/lightchain-dex) (MIT), configured for **KeikoDev's** factory/router.

**Not** the official Lightchain "LCAI Swap" — independent community deployment.

## Contracts (mainnet 9200)

| | Address |
|---|---|
| Factory | `0xEBfA227E7E001d498543D8E31F7780bC7024465B` |
| Router | `0x4e5cF7992699216c489425E18fcD76852686542D` |
| WLCAI | `0xeBf97f16d843bFD9d9E6B1857B4C00d94ca7e2B2` |

## Run locally

```bash
cp .env.example .env.local   # or use existing .env.local
pnpm install
pnpm dev
```

Open http://localhost:3000

## Deploy

```bash
pnpm build
pnpm start
```

Set `NEXT_PUBLIC_REOWN_PROJECT_ID` on your host. Leave nav/footer URLs empty for LightDex-only chrome.

## Classic site

Chart + portfolio remain on `~/Desktop/lightdex/index.html` (lightdex.win) until ported into this app.