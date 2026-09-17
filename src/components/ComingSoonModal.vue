<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from '../lib/locale'
import { CHANNEL_URL } from '../lib/constants'
import { botSoonOpen, closeBotSoon } from '../lib/bot'
import { Goals, reachGoal } from '../lib/metrika'

const { t } = useI18n()

function onChannelClick() {
  reachGoal(Goals.openChannel)
}

function onKey(event) {
  if (event.key === 'Escape') closeBotSoon()
}

watch(botSoonOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="soon">
      <div
        v-if="botSoonOpen"
        class="soon-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="t('soon.title')"
        @click.self="closeBotSoon"
      >
        <div class="soon-modal__card">
          <button
            type="button"
            class="soon-modal__close"
            :aria-label="t('soon.close')"
            @click="closeBotSoon"
          >
            ×
          </button>
          <img src="/brand/mark.jpg" alt="" class="soon-modal__mark" />
          <p class="soon-modal__kicker">{{ t('soon.kicker') }}</p>
          <h2 class="soon-modal__title font-display">{{ t('soon.title') }}</h2>
          <p class="soon-modal__text">{{ t('soon.text') }}</p>
          <div class="soon-modal__actions">
            <a
              :href="CHANNEL_URL"
              class="land-btn land-btn--gold soon-modal__btn"
              target="_blank"
              rel="noopener noreferrer"
              @click="onChannelClick"
            >
              {{ t('soon.channel') }}
            </a>
            <button type="button" class="land-btn land-btn--ghost soon-modal__btn" @click="closeBotSoon">
              {{ t('soon.close') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
