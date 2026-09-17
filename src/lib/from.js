import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BOT_URL, CHANNEL_URL } from './config'
import { choicePath, landingPath, isLocale } from './paths'
import { locale } from './locale'

export { BOT_URL, CHANNEL_URL }

export function useFrom() {
  const route = useRoute()
  const from = computed(() => {
    const value = route.query.from
    return typeof value === 'string' && value ? value : null
  })
  const fromTelegram = computed(() => from.value === 'telegram')
  const lang = computed(() => (isLocale(route.params.lang) ? route.params.lang : locale.value))

  function withFrom(path) {
    if (!from.value) return path
    return { path, query: { from: from.value } }
  }

  function landingLink() {
    return withFrom(landingPath(lang.value))
  }

  function choiceLink(id) {
    return withFrom(choicePath(lang.value, id))
  }

  return { from, fromTelegram, withFrom, landingLink, choiceLink, lang }
}
