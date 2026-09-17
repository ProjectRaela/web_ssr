import { computed, reactive } from 'vue'
import { messages } from '../i18n'
import { detectTelegramLang } from './telegram'
import { isLocale } from './paths'

const state = reactive({
  locale: 'ru',
})

export function guessLocale() {
  return detectTelegramLang()
    ?? (navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en')
}

export function bootLocale() {
  setLocale(guessLocale())
}

export function setLocale(next) {
  state.locale = isLocale(next) ? next : 'ru'
  document.documentElement.lang = state.locale
}

export const locale = computed(() => state.locale)

export function t(path) {
  const bag = messages[state.locale] ?? messages.en
  return path.split('.').reduce((acc, key) => acc?.[key], bag) ?? path
}

export function useI18n() {
  return { locale, setLocale, t }
}
