<script setup>
defineProps({
  name: { type: String, required: true },
})

const icons = {
  life: [
    'M12 3.4v3.1',
    'M6.1 8.1 7.7 9.7',
    'M17.9 8.1 16.3 9.7',
    'M4.6 16.6c1.6-4.3 4.4-6.4 7.4-6.4s5.8 2.1 7.4 6.4',
  ],
  time: ['M12 5.2a6.8 6.8 0 1 1 0 13.6 6.8 6.8 0 0 1 0-13.6z', 'M12 8.4v3.9l2.7 1.7'],
  memory: ['M7.6 7h8.8v6.4h-6.2L7.6 15.8V7z', 'M10 9.4h4.4', 'M10 11.5h3'],
  closeness: [
    'M9.1 12a3.5 3.5 0 1 1 0.02 0z',
    'M14.9 12a3.5 3.5 0 1 1 0.02 0z',
  ],
  voice: ['M6.4 9.1h7.2', 'M6.4 12h11.2', 'M6.4 14.9h5.1'],
  world: [
    'M12 5.2a6.8 6.8 0 1 1 0 13.6 6.8 6.8 0 0 1 0-13.6z',
    'M12 5.4c2.1 2.4 2.1 10.8 0 13.2',
    'M5.4 12h13.2',
  ],
  will: ['M12 5.2a6.8 6.8 0 1 1 0 13.6 6.8 6.8 0 0 1 0-13.6z', 'M12 8.6v6.8'],
}
</script>

<template>
  <svg class="land-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path
      v-for="d in icons[name] ?? icons.voice"
      :key="d"
      :d="d"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
