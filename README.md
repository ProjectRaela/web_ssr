# heroes-choice

Raela companion catalog. Vue 3 + Vite, EN/RU. Built to become a Telegram WebApp and deploy on Vercel.

## Brand files

Upload these to Telegram:

- `public/brand/telegram-channel.jpg` — channel / bot avatar (square mark)
- `public/brand/logo-lockup.jpg` — RAELA lockup for headers and posts

Web-sized copies live next to them as `channel.jpg`, `lockup.jpg`, `mark.jpg`.

## Local

```bash
npm install
npm run dev
```

## Vercel

Import this folder as its own repo. Framework: Vite. Output: `dist`.

Hash routes (`#/haru`) so Telegram’s WebView does not lose the page.

## Telegram WebApp later

The page already loads `telegram-web-app.js`, calls `ready()` / `expand()`, and `sendData` + `close()` on the return button when opened inside a bot.
