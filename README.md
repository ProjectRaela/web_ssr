# web-app

Raela Telegram WebApp. Vue 3 + Vite, EN/RU. Deploy on Vercel.

Landing lives at `/ru` and `/en`. Heroine choice is `/ru/heroes/choice/` or `/en/heroes/choice/`. The first segment sets the locale.

## Brand files

- `public/brand/telegram-channel.png` — channel / bot avatar
- `public/brand/logo-lockup.png` — RAELA lockup

## Config

Copy `.env.example` to `.env` and set links:

```bash
VITE_BOT_URL=https://example.com
VITE_CHANNEL_URL=https://example.com
VITE_YANDEX_METRIKA_ID=112745469
```

Defaults live in `src/lib/config.js`. Yandex Metrika loads only after cookie consent.

## Local

```bash
npm install
npm run dev
```

Open `http://localhost:5173/ru` or `http://localhost:5173/en`.

## Vercel

Import this folder as its own repo. Framework: Vite. Output: `dist`. SPA rewrites send unknown paths to `index.html`.

## Telegram WebApp

Loads `telegram-web-app.js`, calls `ready()` / `expand()`, and `sendData` + `close()` from the return button on choice routes.
