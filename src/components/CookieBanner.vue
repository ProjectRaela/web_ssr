<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from '../lib/locale'
import { getConsent, setConsent } from '../lib/consent'

const { t } = useI18n()
const visible = ref(false)

onMounted(() => {
  if (getConsent() === null) visible.value = true
})

function accept() {
  setConsent('accepted')
  visible.value = false
}

function decline() {
  setConsent('declined')
  visible.value = false
}
</script>

<template>
  <Transition name="cookie">
    <aside
      v-if="visible"
      class="cookie-banner"
      role="dialog"
      aria-live="polite"
      :aria-label="t('cookies.title')"
    >
      <div class="cookie-banner__inner">
        <div class="cookie-banner__copy">
          <p class="cookie-banner__kicker">{{ t('cookies.kicker') }}</p>
          <p class="cookie-banner__title font-display">{{ t('cookies.title') }}</p>
          <p class="cookie-banner__text">{{ t('cookies.text') }}</p>
        </div>
        <div class="cookie-banner__actions">
          <button type="button" class="land-btn land-btn--ghost cookie-banner__btn" @click="decline">
            {{ t('cookies.decline') }}
          </button>
          <button type="button" class="land-btn land-btn--gold cookie-banner__btn" @click="accept">
            {{ t('cookies.accept') }}
          </button>
        </div>
      </div>
    </aside>
  </Transition>
</template>
