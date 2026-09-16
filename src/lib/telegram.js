export function getWebApp() {
  return window.Telegram?.WebApp ?? null
}

export function bootTelegram() {
  const tg = getWebApp()
  if (!tg) return null
  tg.ready()
  tg.expand()
  tg.setHeaderColor?.('#07060A')
  tg.setBackgroundColor?.('#07060A')
  try {
    tg.disableVerticalSwipes?.()
  } catch {
    /* older clients */
  }
  return tg
}

export function detectTelegramLang() {
  const code = getWebApp()?.initDataUnsafe?.user?.language_code
  if (!code) return null
  return String(code).toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export function returnToBot(payload) {
  const tg = getWebApp()
  if (!tg) return false
  if (payload) {
    try {
      tg.sendData(JSON.stringify(payload))
    } catch {
      /* sendData only works inside a bot WebApp */
    }
  }
  tg.close()
  return true
}

export function isTelegram() {
  return Boolean(getWebApp()?.initData)
}
