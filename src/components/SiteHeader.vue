<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../lib/locale'
import { BOT_URL, useFrom } from '../lib/from'
import { handleBotClick } from '../lib/bot'
import { isChoicePath } from '../lib/paths'

const route = useRoute()
const { t } = useI18n()
const { landingLink, choiceLink } = useFrom()
const onChoice = computed(() => isChoicePath(route.path))
</script>

<template>
  <header class="sticky top-0 z-30 glass" :style="{ paddingTop: 'var(--safe-t)' }">
    <div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
      <router-link :to="landingLink()" class="flex min-w-0 shrink items-center gap-2.5 sm:gap-3">
        <img
          src="/brand/mark.jpg"
          alt=""
          class="h-8 w-8 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
        />
        <div class="min-w-0 leading-none">
          <p class="font-display truncate text-[1.25rem] tracking-[0.16em] text-gold sm:text-[1.7rem] sm:tracking-[0.22em]">
            {{ t('brand') }}
          </p>
          <p class="mt-1 hidden text-[0.62rem] uppercase tracking-[0.28em] text-mute sm:block">
            {{ t('kicker') }}
          </p>
        </div>
      </router-link>
      <nav class="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
        <router-link
          :to="choiceLink()"
          class="hidden text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-mute hover:text-gold sm:inline"
          :aria-current="onChoice ? 'page' : undefined"
        >
          {{ t('browse') }}
        </router-link>
        <a
          :href="BOT_URL"
          class="land-btn land-btn--gold site-tg"
          rel="noopener noreferrer"
          @click="handleBotClick"
        >
          Telegram
        </a>
      </nav>
    </div>
  </header>
</template>
