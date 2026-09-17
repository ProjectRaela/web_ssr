<script setup>
import { useI18n } from '../lib/locale'
import { CHANNEL_URL } from '../lib/from'
import { Goals, reachGoal } from '../lib/metrika'

const { t } = useI18n()

function onChannelClick() {
  reachGoal(Goals.openChannel)
}
</script>

<template>
  <section class="channel-cta">
    <div class="channel-cta__glow" aria-hidden="true" />
    <img
      src="/brand/mark.jpg"
      alt=""
      class="channel-cta__mark"
    />
    <p class="channel-cta__kicker">{{ t('channelCtaKicker') }}</p>
    <h2 class="channel-cta__title font-display">{{ t('channelCtaTitle') }}</h2>
    <p class="channel-cta__lead">{{ t('channelCtaLead') }}</p>
    <a
      :href="CHANNEL_URL"
      class="channel-cta__btn"
      target="_blank"
      rel="noopener noreferrer"
      @click="onChannelClick"
    >
      {{ t('channelCtaButton') }}
    </a>
  </section>
</template>
