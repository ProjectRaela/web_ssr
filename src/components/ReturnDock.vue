<script setup>
import { useI18n } from '../lib/locale'
import { isTelegram, returnToBot } from '../lib/telegram'

const { t } = useI18n()

function goBack() {
  returnToBot({ action: 'close' })
}
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4"
    :style="{ paddingBottom: 'calc(0.75rem + var(--safe-b))' }"
  >
    <div class="pointer-events-auto mx-auto flex max-w-lg flex-col items-center gap-2">
      <p class="text-center text-[0.7rem] tracking-[0.14em] text-mute">
        {{ t('returnHint') }}
      </p>
      <button
        type="button"
        class="w-full rounded-full bg-gold px-5 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.22em] text-ink uppercase transition hover:brightness-110"
        @click="goBack"
      >
        {{ isTelegram() ? t('chooseInBot') : t('returnBot') }}
      </button>
    </div>
  </div>
</template>
