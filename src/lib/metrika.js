import { YANDEX_METRIKA_ID } from './constants'

export const Goals = {
  openBot: 'open_bot',
  openChannel: 'open_channel',
  cookieAccept: 'cookie_accept',
  viewHeroine: 'view_heroine',
}

export function reachGoal(name, params) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return
  if (params) {
    window.ym(YANDEX_METRIKA_ID, 'reachGoal', name, params)
    return
  }
  window.ym(YANDEX_METRIKA_ID, 'reachGoal', name)
}
