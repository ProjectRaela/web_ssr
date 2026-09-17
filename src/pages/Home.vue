<script setup>
import { heroines } from '../data/heroines'
import { useI18n } from '../lib/locale'
import HeroCard from '../components/HeroCard.vue'
import ChannelCta from '../components/ChannelCta.vue'
import SiteFoot from '../components/SiteFoot.vue'

const { t } = useI18n()
</script>

<template>
  <div class="choice">
    <div class="land">
      <header class="choice-head land-copy">
        <span class="land-watermark font-display" aria-hidden="true">07</span>
        <p class="land-kicker">{{ t('count') }}</p>
        <ul class="land-stars" aria-hidden="true">
          <li v-for="heroine in heroines" :key="heroine.id" :style="{ '--accent': heroine.accent }" />
        </ul>
        <h1 class="font-display land-title">
          <span>{{ t('tagline') }}</span>
          <em>{{ t('tagline2') }}</em>
        </h1>
        <p class="land-lead">{{ t('lead') }}</p>
      </header>

      <div class="catalog">
        <HeroCard v-for="heroine in heroines" :key="heroine.id" :heroine="heroine" />
      </div>

      <ChannelCta />
      <SiteFoot />
    </div>
  </div>
</template>
