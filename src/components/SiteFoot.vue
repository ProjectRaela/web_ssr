<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { heroines } from '../data/heroines'
import { useI18n } from '../lib/locale'
import { useFrom } from '../lib/from'
import { choicePath, landingPath } from '../lib/paths'

const route = useRoute()
const { t } = useI18n()
const { withFrom, lang } = useFrom()

function pathFor(nextLang) {
  if (route.name === 'heroine') return choicePath(nextLang, route.params.id)
  if (route.name === 'choice') return choicePath(nextLang)
  return landingPath(nextLang)
}

const ruLink = computed(() => withFrom(pathFor('ru')))
const enLink = computed(() => withFrom(pathFor('en')))
</script>

<template>
  <footer class="land-foot">
    <ul class="land-stars" aria-hidden="true">
      <li v-for="heroine in heroines" :key="heroine.id" :style="{ '--accent': heroine.accent }" />
    </ul>
    <p class="land-copyright">{{ t('land.copyright') }}</p>
    <nav class="land-langs">
      <router-link :to="ruLink" :aria-current="lang === 'ru' ? 'page' : undefined">RU</router-link>
      <router-link :to="enLink" :aria-current="lang === 'en' ? 'page' : undefined">EN</router-link>
    </nav>
  </footer>
</template>
