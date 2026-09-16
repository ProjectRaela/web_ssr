<script setup>
import { useI18n } from '../lib/locale'

const { locale, setLocale, t } = useI18n()
</script>

<template>
  <header
    class="sticky top-0 z-30 glass"
    :style="{ paddingTop: 'var(--safe-t)' }"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <router-link to="/" class="flex items-center gap-3">
        <img
          src="/brand/mark.jpg"
          alt=""
          class="h-9 w-9 rounded-full object-cover ring-1 ring-[color-mix(in_srgb,var(--color-gold)_40%,transparent)]"
        />
        <div class="leading-none">
          <p class="font-display text-[1.55rem] tracking-[0.28em] text-gold">
            {{ t('brand') }}
          </p>
          <p class="mt-1 text-[0.62rem] uppercase tracking-[0.32em] text-mute">
            {{ t('kicker') }}
          </p>
        </div>
      </router-link>

      <div
        class="hairline flex overflow-hidden rounded-full text-[0.68rem] font-semibold tracking-[0.18em]"
        role="group"
        :aria-label="t('lang')"
      >
        <button
          type="button"
          class="px-3 py-2 transition"
          :class="locale === 'en' ? 'bg-gold text-ink' : 'text-mute'"
          @click="setLocale('en')"
        >
          EN
        </button>
        <button
          type="button"
          class="px-3 py-2 transition"
          :class="locale === 'ru' ? 'bg-gold text-ink' : 'text-mute'"
          @click="setLocale('ru')"
        >
          RU
        </button>
      </div>
    </div>
  </header>
</template>
