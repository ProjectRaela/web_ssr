<script setup>
import { computed } from 'vue'
import { useI18n } from '../lib/locale'
import { returnToBot, isTelegram } from '../lib/telegram'
import { BOT_URL, CHANNEL_URL, useFrom } from '../lib/from'
import { goToBot, isBotReady } from '../lib/bot'
import { Goals, reachGoal } from '../lib/metrika'

const { t } = useI18n()
const { fromTelegram } = useFrom()

const href = computed(() => (fromTelegram.value ? BOT_URL : CHANNEL_URL))
const label = computed(() => (fromTelegram.value ? t('returnBot') : t('openChannel')))

function go() {
  if (fromTelegram.value) {
    if (isTelegram() && isBotReady) {
      returnToBot({ action: 'close' })
      return
    }
    goToBot()
    return
  }
  reachGoal(Goals.openChannel)
  window.location.href = CHANNEL_URL
}
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4"
    :style="{ paddingBottom: 'calc(0.7rem + var(--safe-b))' }"
  >
    <div class="pointer-events-auto mx-auto flex max-w-md justify-center">
      <a
        :href="href"
        class="dock-btn"
        rel="noopener noreferrer"
        @click.prevent="go"
      >
        {{ label }}
      </a>
    </div>
  </div>
</template>
