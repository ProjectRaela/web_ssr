<script setup>
import { computed } from 'vue'
import PhoneFrame from '../components/PhoneFrame.vue'
import ChannelCta from '../components/ChannelCta.vue'
import LandMark from '../components/LandMark.vue'
import FaqList from '../components/FaqList.vue'
import { heroines } from '../data/heroines'
import { FEATURES, STEPS, DAY } from '../data/landing'
import { useI18n } from '../lib/locale'
import { BOT_URL, useFrom } from '../lib/from'
import { handleBotClick } from '../lib/bot'

const { t } = useI18n()
const { choiceLink, fromTelegram } = useFrom()

const botHref = BOT_URL
const botLabel = computed(() => (fromTelegram.value ? t('returnBot') : t('land.ctaBot')))
</script>

<template>
  <div>
    <div class="land">
      <section class="land-hero">
        <span class="land-watermark font-display" aria-hidden="true">07</span>
        <svg class="land-blot" viewBox="0 0 180 260" aria-hidden="true">
          <path d="M92 12C38 52 138 78 64 132s102 58 56 116" />
        </svg>
        <div class="land-copy fade-up">
          <p class="land-kicker">{{ t('land.kicker') }}</p>
          <ul class="land-stars" aria-hidden="true">
            <li v-for="heroine in heroines" :key="heroine.id" :style="{ '--accent': heroine.accent }" />
          </ul>
          <h1 class="font-display land-title">
            <span>{{ t('land.title') }}</span>
            <em>{{ t('land.title2') }}</em>
          </h1>
          <p class="land-lead">{{ t('land.lead') }}</p>
          <div class="land-actions">
            <a
              :href="botHref"
              class="land-btn land-btn--gold"
              rel="noopener noreferrer"
              @click="handleBotClick"
            >
              {{ botLabel }}
            </a>
            <router-link :to="choiceLink()" class="land-btn land-btn--ghost">
              {{ t('land.ctaSeven') }}
            </router-link>
          </div>
          <p class="land-hint">{{ t('land.hint') }}</p>
        </div>
        <div class="land-demo fade-up">
          <PhoneFrame />
        </div>
      </section>
    </div>

    <section class="land-film" :aria-label="t('land.filmKicker')">
      <p class="land-film__run">{{ t('land.filmKicker') }} · 01–07</p>
      <div class="land-film__track">
        <router-link
          v-for="heroine in heroines"
          :key="heroine.id"
          :to="choiceLink(heroine.id)"
          class="land-film__shot"
          :style="{ '--accent': heroine.accent }"
        >
          <b>{{ heroine.index }}</b>
          <img
            :src="`/heroes/${heroine.id}/full.jpg`"
            :alt="t(`heroines.${heroine.id}.name`)"
          />
          <span>{{ t(`heroines.${heroine.id}.name`) }}</span>
        </router-link>
      </div>
    </section>

    <div class="land">
      <section class="land-block">
        <p class="land-kicker">{{ t('land.featuresKicker') }}</p>
        <h2 class="font-display land-h2">{{ t('land.featuresTitle') }}</h2>
        <div class="land-bento">
          <article
            v-for="(feature, index) in FEATURES"
            :key="feature.id"
            class="land-card"
            :class="{ 'is-wide': feature.span === 'wide' }"
          >
            <div class="land-card__top">
              <p class="land-card__n">{{ String(index + 1).padStart(2, '0') }}</p>
              <LandMark :name="feature.id" />
            </div>
            <h3 class="font-display">{{ t(`land.features.${feature.id}.title`) }}</h3>
            <p>{{ t(`land.features.${feature.id}.body`) }}</p>
          </article>
        </div>
      </section>

      <section class="land-block">
        <p class="land-kicker">{{ t('land.dayKicker') }}</p>
        <h2 class="font-display land-h2">{{ t('land.dayTitle') }}</h2>
        <p class="land-section-lead">{{ t('land.dayLead') }}</p>
        <div class="land-day-rail" aria-hidden="true">
          <i /><i /><i />
        </div>
        <div class="land-day">
          <article
            v-for="slot in DAY"
            :key="slot.id"
            :style="{ '--accent': heroines.find((h) => h.id === slot.heroine)?.accent }"
          >
            <img
              :src="`/heroes/${slot.heroine}/full.jpg`"
              :alt="t(`heroines.${slot.heroine}.name`)"
            />
            <div>
              <p>{{ t(`land.day.${slot.id}.time`) }}</p>
              <h3 class="font-display">{{ t(`land.day.${slot.id}.title`) }}</h3>
              <p>{{ t(`land.day.${slot.id}.body`) }}</p>
            </div>
          </article>
        </div>
      </section>

      <blockquote class="land-pull">
        <span class="land-pull__mark font-display" aria-hidden="true">“</span>
        <p class="font-display">{{ t('land.pull') }}</p>
        <span class="land-seal font-display" aria-hidden="true">07</span>
      </blockquote>

      <section class="land-block">
        <p class="land-kicker">{{ t('land.castKicker') }}</p>
        <h2 class="font-display land-h2">{{ t('land.castTitle') }}</h2>
        <p class="land-section-lead">{{ t('land.castLead') }}</p>
        <div class="land-cast">
          <router-link
            v-for="heroine in heroines"
            :key="heroine.id"
            :to="choiceLink(heroine.id)"
            class="land-cast__card"
            :style="{ '--accent': heroine.accent }"
          >
            <img
              :src="`/heroes/${heroine.id}/portrait.jpg`"
              :alt="t(`heroines.${heroine.id}.name`)"
            />
            <span class="land-cast__index">{{ heroine.index }}</span>
            <div class="land-cast__meta">
              <strong class="font-display">{{ t(`heroines.${heroine.id}.name`) }}</strong>
              <em>{{ t(`heroines.${heroine.id}.role`) }}</em>
            </div>
          </router-link>
        </div>
        <div class="land-actions land-actions--center">
          <router-link :to="choiceLink()" class="land-btn land-btn--ghost">
            {{ t('land.ctaSeven') }}
          </router-link>
        </div>
      </section>

      <section class="land-block">
        <p class="land-kicker">{{ t('land.voicesKicker') }}</p>
        <h2 class="font-display land-h2">{{ t('land.voicesTitle') }}</h2>
        <div class="land-voices">
          <router-link
            v-for="(heroine, index) in heroines"
            :key="heroine.id"
            :to="choiceLink(heroine.id)"
            class="land-voice"
            :class="{ 'is-lead': index === 0 }"
            :style="{ '--accent': heroine.accent }"
          >
            <img
              :src="`/heroes/${heroine.id}/portrait.jpg`"
              :alt="t(`heroines.${heroine.id}.name`)"
            />
            <div>
              <p class="font-display">“{{ t(`heroines.${heroine.id}.quote`) }}”</p>
              <span>{{ t(`heroines.${heroine.id}.name`) }}</span>
            </div>
          </router-link>
        </div>
      </section>

      <section class="land-wire">
        <div class="land-wire__faces" aria-hidden="true">
          <img
            v-for="heroine in heroines"
            :key="heroine.id"
            :src="`/heroes/${heroine.id}/portrait.jpg`"
            alt=""
          />
        </div>
        <p class="land-kicker">{{ t('land.wireKicker') }}</p>
        <h2 class="font-display">{{ t('land.wireTitle') }}</h2>
        <p>{{ t('land.wireLead') }}</p>
      </section>

      <section class="land-block">
        <p class="land-kicker">{{ t('land.stepsKicker') }}</p>
        <h2 class="font-display land-h2">{{ t('land.stepsTitle') }}</h2>
        <ol class="land-steps">
          <li v-for="(step, index) in STEPS" :key="step">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="font-display">{{ t(`land.steps.${step}.title`) }}</h3>
            <p>{{ t(`land.steps.${step}.body`) }}</p>
          </li>
        </ol>
        <div class="land-actions land-actions--center">
          <a
            :href="botHref"
            class="land-btn land-btn--gold"
            rel="noopener noreferrer"
            @click="handleBotClick"
          >
            {{ botLabel }}
          </a>
        </div>
      </section>

      <FaqList />

      <ChannelCta />
    </div>
  </div>
</template>
