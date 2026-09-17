<script setup>
import { ref } from 'vue'
import { FAQ } from '../data/faq'
import { useI18n } from '../lib/locale'

const { t } = useI18n()
const openId = ref(FAQ[0] ?? null)

function toggle(id) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section class="land-block" id="faq">
    <p class="land-kicker">{{ t('land.faqKicker') }}</p>
    <h2 class="font-display land-h2">{{ t('land.faqTitle') }}</h2>
    <div class="faq-list">
      <div
        v-for="item in FAQ"
        :key="item"
        class="faq-item"
        :class="{ 'is-open': openId === item }"
      >
        <button
          type="button"
          class="faq-item__head"
          :aria-expanded="openId === item"
          @click="toggle(item)"
        >
          <span>{{ t(`land.faq.${item}.title`) }}</span>
          <i class="faq-item__icon" aria-hidden="true">
            <svg v-if="openId === item" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4L4 12" stroke="currentColor" stroke-width="1.5" />
            </svg>
            <svg v-else viewBox="0 0 16 16" fill="none">
              <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </i>
        </button>
        <div v-show="openId === item" class="faq-item__body">
          <p>{{ t(`land.faq.${item}.body`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
