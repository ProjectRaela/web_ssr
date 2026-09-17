<script setup>
import { computed } from 'vue'
import { useI18n } from '../lib/locale'

const props = defineProps({
  label: { type: String, required: true },
  meterKey: { type: String, required: true },
  value: { type: Number, required: true },
  accent: { type: String, required: true },
})

const { t } = useI18n()

const tier = computed(() => Math.min(4, Math.floor(props.value / 20)))
const word = computed(() => {
  const words = t(`meterWords.${props.meterKey}`)
  return Array.isArray(words) ? words[tier.value] : ''
})
</script>

<template>
  <div>
    <div class="mb-2 flex items-baseline justify-between gap-3">
      <span class="text-[0.74rem] font-medium text-mute">{{ label }}</span>
      <span class="font-display text-base italic text-ivory">{{ word }}</span>
    </div>
    <div class="meter">
      <i v-for="n in 5" :key="n" :class="{ lit: n - 1 <= tier }" :style="{ '--accent': accent }" />
    </div>
  </div>
</template>
