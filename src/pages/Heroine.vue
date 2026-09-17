<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getHeroine, heroines } from '../data/heroines'
import { useI18n } from '../lib/locale'
import { useFrom } from '../lib/from'
import StatMeter from '../components/StatMeter.vue'
import SiteFoot from '../components/SiteFoot.vue'

const route = useRoute()
const { t } = useI18n()
const { choiceLink } = useFrom()

const heroine = computed(() => getHeroine(route.params.id))
const copy = computed(() => t(`heroines.${route.params.id}`))
const others = computed(() => heroines.filter((h) => h.id !== heroine.value?.id))

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
</script>

<template>
  <article
    v-if="heroine"
    class="profile"
    :style="{ '--accent': heroine.accent }"
  >
    <div class="profile-shell">
      <router-link :to="choiceLink()" class="land-btn land-btn--ghost profile-back">
        {{ t('back') }}
      </router-link>

      <div class="profile-shot">
        <span class="profile-shot__mark font-display" aria-hidden="true">{{ heroine.index }}</span>
        <img
          :src="`/heroes/${heroine.id}/portrait.jpg`"
          :alt="`${copy.name} — ${t('portrait')}`"
        />
        <div class="profile-shot-veil" />
        <div class="profile-shot-copy">
          <p class="land-kicker profile-kicker">
            {{ heroine.index }} · {{ t(`difficultyMap.${heroine.difficulty}`) }}
          </p>
          <h1 class="font-display">{{ copy.name }}</h1>
          <p class="profile-quote">“{{ copy.quote }}”</p>
        </div>
      </div>

      <div class="profile-dossier">
        <p class="profile-role">{{ copy.role }}</p>
        <p class="profile-lead">{{ copy.lead }}</p>
        <p class="profile-body">{{ copy.body }}</p>

        <dl class="profile-facts">
          <div class="profile-facts__stats">
            <div>
              <dt>{{ t('age') }}</dt>
              <dd class="font-display">{{ heroine.age }}</dd>
            </div>
            <div>
              <dt>{{ t('height') }}</dt>
              <dd class="font-display">
                {{ heroine.height }}<span>{{ t('cm') }}</span>
              </dd>
            </div>
          </div>
          <div class="profile-facts__temper">
            <dt>{{ t('archetype') }}</dt>
            <dd>{{ copy.archetype }}</dd>
          </div>
        </dl>

        <section class="profile-meters">
          <StatMeter
            v-for="row in meters"
            :key="row.key"
            :label="t(row.key)"
            :meterKey="row.key"
            :value="row.value"
            :accent="heroine.accent"
          />
        </section>

        <section class="profile-notes">
          <div>
            <h2>{{ t('keyStat') }}</h2>
            <p>{{ copy.key }}</p>
          </div>
          <div>
            <h2>{{ t('howMet') }}</h2>
            <p>{{ copy.met }}</p>
          </div>
          <div>
            <h2>{{ t('note') }}</h2>
            <p>{{ copy.note }}</p>
          </div>
        </section>

        <section>
          <h2 class="profile-notes-title">{{ t('traits') }}</h2>
          <ul class="profile-traits">
            <li v-for="trait in copy.traits" :key="trait">{{ trait }}</li>
          </ul>
        </section>

        <nav class="profile-others" :aria-label="t('browse')">
          <router-link
            v-for="item in others"
            :key="item.id"
            :to="choiceLink(item.id)"
            :style="{ '--accent': item.accent }"
          >
            <img
              :src="`/heroes/${item.id}/portrait.jpg`"
              :alt="t(`heroines.${item.id}.name`)"
            />
            <span>{{ t(`heroines.${item.id}.name`) }}</span>
          </router-link>
        </nav>

        <figure class="profile-full">
          <img
            :src="`/heroes/${heroine.id}/full.jpg`"
            :alt="`${copy.name} — ${t('full')}`"
          />
        </figure>
      </div>

      <SiteFoot />
    </div>
  </article>
</template>
