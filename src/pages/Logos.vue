<script setup>
const options = [
  { id: '01', file: '01-keyhole.png', title: 'Ключ', note: 'замочная скважина, тёплый свет внутри' },
  { id: '02', file: '02-window.png', title: 'Окно', note: 'ночное окно, кто-то живёт' },
  { id: '03', file: '03-lantern.png', title: 'Фонарь', note: 'бумажный фонарь' },
  { id: '04', file: '04-iris.png', title: 'Ирис', note: 'семь лепестков' },
  { id: '05', file: '05-letter.png', title: 'Письмо', note: 'конверт с печатью' },
  { id: '06', file: '06-ra.png', title: 'RA', note: 'монограмма R+A' },
  { id: '07', file: '07-ink.png', title: 'Тушь', note: 'каллиграфический жест' },
  { id: '08', file: '08-thread.png', title: 'Нить', note: 'узел на золотой нити' },
  { id: '09', file: '09-flame.png', title: 'Пламя', note: 'один огонёк' },
  { id: '10', file: '10-glance.png', title: 'Взгляд', note: 'прикрытый глаз' },
]
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6">
    <p class="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold">Brand</p>
    <h1 class="font-display mt-2 text-4xl text-ivory">10 знаков. Напиши номер.</h1>
    <p class="mt-3 max-w-xl text-mute">
      Это только аватар канала. Когда выберешь — соберу от него логотип-локъап.
    </p>
    <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <figure
        v-for="item in options"
        :key="item.id"
        class="overflow-hidden rounded-2xl border border-gold/20 bg-panel"
      >
        <img
          :src="`/brand/options/${item.file}`"
          :alt="item.title"
          class="aspect-square w-full object-cover"
        />
        <figcaption class="px-3 py-3">
          <p class="font-display text-xl text-ivory">{{ item.id }}. {{ item.title }}</p>
          <p class="mt-1 text-[0.78rem] text-mute">{{ item.note }}</p>
        </figcaption>
      </figure>
    </div>
  </div>
</template>
