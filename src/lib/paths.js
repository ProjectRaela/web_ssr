export const LOCALES = ['en', 'ru']
export const CHOICE_TAIL = 'heroes/choice'

export function isLocale(value) {
  return value === 'en' || value === 'ru'
}

export function landingPath(lang) {
  return `/${isLocale(lang) ? lang : 'ru'}`
}

export function choicePath(lang, id) {
  const prefix = isLocale(lang) ? lang : 'ru'
  const base = `/${prefix}/${CHOICE_TAIL}`
  return id ? `${base}/${id}` : base
}

export function isChoicePath(path) {
  return path.includes(`/${CHOICE_TAIL}`)
}
