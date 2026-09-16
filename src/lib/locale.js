import { computed, reactive } from 'vue'
import { messages } from '../i18n'
import { detectTelegramLang } from './telegram'

const KEY = 'raela-locale'

const state = reactive({
  locale: 'en',
})

function readStored() {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === 'ru' || stored === 'en') return stored
  } catch {
    /* private mode */
  }
  return null
}

function guessLocale() {
  return detectTelegramLang()
    ?? (navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en')
}

export function bootLocale() {
  state.locale = readStored() ?? guessLocale()
  document.documentElement.lang = state.locale
}

export function setLocale(next) {
  state.locale = next === 'ru' ? 'ru' : 'en'
  document.documentElement.lang = state.locale
  try {
    localStorage.setItem(KEY, state.locale)
  } catch {
    /* ignore */
  }
}

export const locale = computed(() => state.locale)

export function t(path) {
  const bag = messages[state.locale] ?? messages.en
  return path.split('.').reduce((acc, key) => acc?.[key], bag) ?? path
}

export function useI18n() {
  return { locale, setLocale, t }
}
