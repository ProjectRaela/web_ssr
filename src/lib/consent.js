const KEY = 'raela.cookieConsent'

export function getConsent() {
  try {
    const value = localStorage.getItem(KEY)
    if (value === 'accepted' || value === 'declined') return value
  } catch {
    /* private mode */
  }
  return null
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* private mode */
  }
}
