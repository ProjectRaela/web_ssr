<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { chats } from '../data/chats'
import { getHeroine } from '../data/heroines'
import { useI18n } from '../lib/locale'

const { t, locale } = useI18n()
const active = ref(chats[0].id)
const thread = ref(null)

const chat = computed(() => chats.find((item) => item.id === active.value) ?? chats[0])
const heroine = computed(() => getHeroine(chat.value.id))
const name = computed(() => t(`heroines.${chat.value.id}.name`))
const status = computed(() => chat.value.status[locale.value] ?? chat.value.status.en)
const clock = computed(() => chat.value.time)
const accent = computed(() => heroine.value?.accent ?? '#d4b072')

function scrollEnd() {
  nextTick(() => {
    const el = thread.value
    if (!el) return
    const jump = () => {
      el.scrollTop = el.scrollHeight
    }
    jump()
    el.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', jump, { once: true })
    })
  })
}

onMounted(scrollEnd)
watch(active, scrollEnd)

function line(message) {
  if (message.kind === 'day') return ''
  return message[locale.value] ?? message.en ?? ''
}

function photoOf(message) {
  const file = message.photo === 'portrait' ? 'portrait.jpg' : 'full.jpg'
  return `/heroes/${chat.value.id}/${file}`
}

function stacked(list, index, side) {
  const current = list[index]
  if (!current?.from || current.photo) return false
  const other = side === 'prev' ? list[index - 1] : list[index + 1]
  return Boolean(other?.from && other.from === current.from && !other.photo)
}
</script>

<template>
  <div class="phone-stage" :style="{ '--accent': accent }">
    <div class="phone-glow" aria-hidden="true" />
    <figure class="phone-polaroid is-back" aria-hidden="true">
      <img :src="`/heroes/${chat.id}/full.jpg`" alt="" />
      <figcaption>{{ clock }}</figcaption>
    </figure>
    <figure class="phone-polaroid is-front" aria-hidden="true">
      <img :src="`/heroes/${chat.id}/portrait.jpg`" alt="" />
      <figcaption>{{ name }}</figcaption>
    </figure>
    <div class="phone-float">
      <div class="phone">
        <i class="phone-silent" aria-hidden="true" />
        <i class="phone-vol is-up" aria-hidden="true" />
        <i class="phone-vol is-down" aria-hidden="true" />
        <i class="phone-power" aria-hidden="true" />
        <div class="phone-bezel">
          <div class="phone-shine" aria-hidden="true" />
          <div class="phone-island" aria-hidden="true"><i /></div>
          <div class="phone-screen">
            <div class="phone-status">
              <span>{{ clock }}</span>
              <span class="phone-status__icons" aria-hidden="true">
                <svg viewBox="0 0 14 12" fill="currentColor">
                  <rect x="0" y="8" width="2.2" height="4" rx="0.4" />
                  <rect x="3.6" y="5.5" width="2.2" height="6.5" rx="0.4" />
                  <rect x="7.2" y="3" width="2.2" height="9" rx="0.4" />
                  <rect x="10.8" y="0" width="2.2" height="12" rx="0.4" opacity="0.35" />
                </svg>
                <svg viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M1 8.2c2.4-2.6 5.4-4 7.9-4s5.5 1.4 7.9 4" />
                  <path d="M4.2 9.4c1.5-1.5 3.2-2.2 4.7-2.2s3.2.7 4.7 2.2" />
                  <circle cx="8.9" cy="10.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
                <svg viewBox="0 0 26 12" fill="currentColor">
                  <rect
                    x="0.6"
                    y="1.6"
                    width="21"
                    height="8.8"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.2"
                  />
                  <rect x="2.2" y="3.1" width="15.2" height="5.8" rx="1" />
                  <rect x="22.4" y="4.1" width="2.2" height="3.8" rx="0.6" />
                </svg>
              </span>
            </div>
            <header class="phone-head">
              <span class="phone-back" aria-hidden="true">‹</span>
              <div class="phone-head__face">
                <img
                  :src="`/heroes/${chat.id}/portrait.jpg`"
                  :alt="name"
                  class="phone-head__avatar"
                />
                <i v-if="!chat.typing" class="phone-head__live" />
              </div>
              <div class="min-w-0">
                <p class="phone-head__name">{{ name }}</p>
                <p class="phone-head__status">{{ status }}</p>
              </div>
              <span class="phone-head__more" aria-hidden="true">···</span>
            </header>
            <div ref="thread" class="phone-thread">
              <template v-for="(message, index) in chat.messages" :key="index">
                <p v-if="message.kind === 'day'" class="phone-day">
                  {{ message[locale] ?? message.en }}
                </p>
                <div
                  v-else
                  class="phone-row"
                  :class="message.from === 'me' ? 'is-me' : 'is-her'"
                >
                  <div
                    class="phone-bubble"
                    :class="{
                      'is-fix': message.fix,
                      'is-photo': Boolean(message.photo),
                      'stack-prev': stacked(chat.messages, index, 'prev'),
                      'stack-next': stacked(chat.messages, index, 'next'),
                    }"
                  >
                    <img
                      v-if="message.photo"
                      :src="photoOf(message)"
                      :alt="name"
                    />
                    <p v-if="line(message)">{{ line(message) }}</p>
                    <span v-if="message.react" class="phone-react">{{ message.react }}</span>
                  </div>
                </div>
              </template>
              <div v-if="chat.typing" class="phone-row is-her">
                <div class="phone-bubble phone-typing" aria-hidden="true">
                  <i /><i /><i />
                </div>
              </div>
            </div>
            <div class="phone-composer" aria-hidden="true">
              <span class="phone-plus" />
              <span>{{ t('land.composer') }}</span>
              <span class="phone-send" />
            </div>
            <div class="phone-home" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
    <div class="phone-reflect" aria-hidden="true" />
    <div class="phone-switch">
      <button
        v-for="item in chats"
        :key="item.id"
        type="button"
        class="phone-switch__btn"
        :class="{ 'is-on': item.id === active }"
        :style="{ '--accent': getHeroine(item.id)?.accent }"
        :aria-pressed="item.id === active"
        @click="active = item.id"
      >
        <img :src="`/heroes/${item.id}/portrait.jpg`" :alt="t(`heroines.${item.id}.name`)" />
        <span>{{ t(`heroines.${item.id}.name`) }}</span>
      </button>
    </div>
  </div>
</template>
