<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { heroines } from '../data/heroines'
import { useI18n } from '../lib/locale'
import { BOT_URL, CHANNEL_URL, useFrom } from '../lib/from'
import { choicePath, landingPath } from '../lib/paths'
import { handleBotClick } from '../lib/bot'
import { Goals, reachGoal } from '../lib/metrika'

const route = useRoute()
const { t } = useI18n()
const { withFrom, lang, choiceLink, landingLink } = useFrom()

function pathFor(nextLang) {
  if (route.name === 'heroine') return choicePath(nextLang, route.params.id)
  if (route.name === 'choice') return choicePath(nextLang)
  return landingPath(nextLang)
}

const ruLink = computed(() => withFrom(pathFor('ru')))
const enLink = computed(() => withFrom(pathFor('en')))

function onChannelClick() {
  reachGoal(Goals.openChannel)
}
</script>

<template>
  <footer class="site-foot">
    <div class="site-foot__inner">
      <div class="site-foot__head">
        <div>
          <router-link :to="landingLink()" class="site-foot__brand font-display">
            {{ t('brand') }}
          </router-link>
          <p class="site-foot__tag">{{ t('foot.tag') }}</p>
        </div>
        <div class="site-foot__meta">
          <a
            :href="CHANNEL_URL"
            target="_blank"
            rel="noopener noreferrer"
            @click="onChannelClick"
          >
            {{ t('foot.channel') }}
          </a>
          <a :href="BOT_URL" rel="noopener noreferrer" @click="handleBotClick">
            {{ t('foot.bot') }}
          </a>
          <nav class="site-foot__langs" :aria-label="t('lang')">
            <router-link :to="ruLink" :aria-current="lang === 'ru' ? 'page' : undefined">RU</router-link>
            <router-link :to="enLink" :aria-current="lang === 'en' ? 'page' : undefined">EN</router-link>
          </nav>
        </div>
      </div>
      <nav class="site-foot__cast" :aria-label="t('foot.cast')">
        <router-link
          v-for="heroine in heroines"
          :key="heroine.id"
          :to="choiceLink(heroine.id)"
        >
          <span>{{ heroine.index }}</span>
          {{ t(`heroines.${heroine.id}.name`) }}
        </router-link>
      </nav>
    </div>
  </footer>
</template>
