<script setup>
import { computed } from 'vue'
import { useI18n } from '../lib/locale'
import { useFrom } from '../lib/from'

const props = defineProps({
  heroine: { type: Object, required: true },
})

const { t } = useI18n()
const { choiceLink } = useFrom()
const copy = computed(() => t(`heroines.${props.heroine.id}`))
const difficulty = computed(() => t(`difficultyMap.${props.heroine.difficulty}`))
</script>

<template>
  <router-link
    :to="choiceLink(heroine.id)"
    class="hero-card"
    :style="{ '--accent': heroine.accent }"
  >
    <img
      :src="`/heroes/${heroine.id}/full.jpg`"
      :alt="copy.name"
      loading="lazy"
    />
    <div class="veil" />
    <span class="hero-card__index">{{ heroine.index }}</span>
    <div class="hero-card__meta">
      <p class="hero-card__kicker">{{ difficulty }}</p>
      <h2 class="hero-card__name font-display">{{ copy.name }}</h2>
      <p class="hero-card__role">{{ copy.role }} · {{ heroine.age }}</p>
      <p class="hero-card__quote">“{{ copy.quote }}”</p>
      <span class="hero-card__cta">{{ t('look') }} →</span>
    </div>
  </router-link>
</template>
