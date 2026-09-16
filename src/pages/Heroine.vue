<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getHeroine } from '../data/heroines'
import { useI18n } from '../lib/locale'
import { returnToBot } from '../lib/telegram'
import StatMeter from '../components/StatMeter.vue'

const route = useRoute()
const { t } = useI18n()

const heroine = computed(() => getHeroine(route.params.id))
const copy = computed(() => t(`heroines.${route.params.id}`))

const meters = computed(() => {
  const s = heroine.value.stats
  return [
    { key: 'paceEarly', value: s.early },
    { key: 'paceLate', value: s.late },
    { key: 'initiative', value: s.initiative },
    { key: 'reply', value: s.reply },
    { key: 'challenge', value: s.challenge },
  ]
})

function pick() {
  returnToBot({ action: 'viewed', heroine: heroine.value.id })
}
</script>

<template>
  <article
    v-if="heroine"
    class="mx-auto max-w-6xl px-4 pb-44 pt-4 sm:px-6 sm:pt-8"
    :style="{ '--accent': heroine.accent }"
  >
    <router-link
      to="/"
      class="mb-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-mute hover:text-gold"
    >
      <span aria-hidden="true">←</span>
      {{ t('back') }}
    </router-link>

    <div class="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
      <div class="space-y-4">
        <figure class="hairline overflow-hidden rounded-[1.6rem]">
          <img
            :src="`/heroes/${heroine.id}/portrait.jpg`"
            :alt="`${copy.name} — ${t('portrait')}`"
            class="aspect-[4/5] w-full object-cover object-top"
          />
        </figure>
        <figure class="hairline hidden overflow-hidden rounded-[1.6rem] sm:block">
          <img
            :src="`/heroes/${heroine.id}/full.jpg`"
            :alt="`${copy.name} — ${t('full')}`"
            class="w-full object-cover object-top"
          />
        </figure>
      </div>

      <div class="fade-up lg:sticky lg:top-24">
        <p
          class="text-[0.68rem] font-semibold uppercase tracking-[0.3em]"
          :style="{ color: heroine.accent }"
        >
          {{ t(`difficultyMap.${heroine.difficulty}`) }}
        </p>
        <h1 class="font-display mt-2 text-6xl leading-none sm:text-7xl">
          {{ copy.name }}
        </h1>
        <p class="mt-3 text-lg text-mute">{{ copy.role }}</p>
        <p class="font-display mt-6 text-2xl italic leading-snug text-ivory/90 sm:text-3xl">
          “{{ copy.quote }}”
        </p>
        <p class="mt-6 text-base leading-relaxed text-ivory/85">
          {{ copy.lead }}
        </p>
        <p class="mt-4 text-base leading-relaxed text-mute">
          {{ copy.body }}
        </p>

        <dl class="mt-8 grid grid-cols-3 gap-3">
          <div class="hairline rounded-2xl px-3 py-4 text-center">
            <dt class="text-[0.62rem] uppercase tracking-[0.18em] text-mute">{{ t('age') }}</dt>
            <dd class="font-display mt-1 text-3xl">{{ heroine.age }}</dd>
          </div>
          <div class="hairline rounded-2xl px-3 py-4 text-center">
            <dt class="text-[0.62rem] uppercase tracking-[0.18em] text-mute">{{ t('height') }}</dt>
            <dd class="font-display mt-1 text-3xl">{{ heroine.height }}<span class="text-base text-mute">{{ t('cm') }}</span></dd>
          </div>
          <div class="hairline rounded-2xl px-3 py-4 text-center">
            <dt class="text-[0.62rem] uppercase tracking-[0.18em] text-mute">{{ t('archetype') }}</dt>
            <dd class="mt-2 text-[0.78rem] leading-snug text-ivory/80">{{ copy.archetype }}</dd>
          </div>
        </dl>

        <section class="mt-10 space-y-5">
          <StatMeter
            v-for="row in meters"
            :key="row.key"
            :label="t(row.key)"
            :value="row.value"
            :accent="heroine.accent"
          />
        </section>

        <section class="mt-10 space-y-6">
          <div>
            <h2 class="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {{ t('keyStat') }}
            </h2>
            <p class="mt-2 leading-relaxed text-ivory/85">{{ copy.key }}</p>
          </div>
          <div>
            <h2 class="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {{ t('howMet') }}
            </h2>
            <p class="mt-2 leading-relaxed text-ivory/85">{{ copy.met }}</p>
          </div>
          <div>
            <h2 class="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {{ t('note') }}
            </h2>
            <p class="mt-2 leading-relaxed text-ivory/85">{{ copy.note }}</p>
          </div>
          <div>
            <h2 class="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {{ t('traits') }}
            </h2>
            <ul class="mt-3 flex flex-wrap gap-2">
              <li
                v-for="trait in copy.traits"
                :key="trait"
                class="hairline rounded-full px-3 py-1.5 text-[0.78rem] text-ivory/85"
              >
                {{ trait }}
              </li>
            </ul>
          </div>
        </section>

        <button
          type="button"
          class="mt-10 hidden w-full rounded-full px-5 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] sm:block"
          :style="{ background: heroine.accent, color: '#07060A' }"
          @click="pick"
        >
          {{ t('returnBot') }}
        </button>
      </div>
    </div>

    <figure class="hairline mt-8 overflow-hidden rounded-[1.6rem] sm:hidden">
      <img
        :src="`/heroes/${heroine.id}/full.jpg`"
        :alt="`${copy.name} — ${t('full')}`"
        class="w-full object-cover object-top"
      />
    </figure>
  </article>
</template>
