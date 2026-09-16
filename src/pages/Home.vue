<script setup>
import { heroines } from '../data/heroines'
import { useI18n } from '../lib/locale'
import HeroCard from '../components/HeroCard.vue'

const { t } = useI18n()
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-40 pt-6 sm:px-6 sm:pt-10">
    <section class="fade-up relative overflow-hidden rounded-[2rem] hairline px-6 py-12 sm:px-14 sm:py-16">
      <div
        class="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full opacity-40"
        style="background: radial-gradient(circle, rgba(212,175,122,0.35), transparent 68%)"
      />
      <div class="relative grid items-center gap-10 lg:grid-cols-[auto_1fr]">
        <img
          src="/brand/channel.jpg"
          alt="Raela"
          class="ring mx-auto h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36"
        />
        <div class="max-w-2xl">
          <p class="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-gold">
            {{ t('count') }}
          </p>
          <h1 class="font-display mt-3 text-5xl leading-[0.95] text-ivory sm:text-7xl">
            {{ t('tagline') }}
          </h1>
          <p class="mt-5 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
            {{ t('lead') }}
          </p>
        </div>
      </div>
    </section>

    <div class="mt-12 mb-5 flex items-end justify-between">
      <h2 class="font-display text-3xl sm:text-4xl">{{ t('browse') }}</h2>
      <span class="text-[0.68rem] uppercase tracking-[0.28em] text-gold-dim">07</span>
    </div>

    <div class="catalog">
      <HeroCard v-for="heroine in heroines" :key="heroine.id" :heroine="heroine" />
    </div>
  </div>
</template>
