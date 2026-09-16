<script setup>
import { computed } from 'vue'
import { useI18n } from '../lib/locale'

const props = defineProps({
  heroine: { type: Object, required: true },
})

const { t, locale } = useI18n()

const copy = computed(() => t(`heroines.${props.heroine.id}`))
const difficulty = computed(() => t(`difficultyMap.${props.heroine.difficulty}`))
</script>

<template>
  <router-link
    :to="`/${heroine.id}`"
    class="hero-card hairline block"
    :style="{ '--accent': heroine.accent }"
  >
    <img
      :src="`/heroes/${heroine.id}/portrait.jpg`"
      :alt="copy.name"
      loading="lazy"
    />
    <div class="veil" />
    <div class="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
      <p
        class="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em]"
        :style="{ color: heroine.accent }"
      >
        {{ difficulty }}
      </p>
      <h2 class="font-display text-4xl leading-none sm:text-5xl">
        {{ copy.name }}
      </h2>
      <p class="mt-2 text-sm text-mute">
        {{ copy.role }}
        <span class="text-ivory/40"> · {{ heroine.age }}</span>
      </p>
      <p class="mt-3 max-w-sm text-[0.95rem] italic text-ivory/80" :key="locale">
        {{ copy.quote }}
      </p>
      <p
        class="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em]"
        :style="{ color: heroine.accent }"
      >
        {{ t('look') }}
        <span aria-hidden="true">→</span>
      </p>
    </div>
  </router-link>
</template>
