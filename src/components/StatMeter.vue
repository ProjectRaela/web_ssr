<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: Number, required: true },
  accent: { type: String, required: true },
})
</script>

<template>
  <div>
    <div class="mb-2 flex items-baseline justify-between gap-3">
      <span class="text-[0.72rem] uppercase tracking-[0.18em] text-mute">{{ label }}</span>
      <span class="font-display text-lg text-ivory/80">{{ value }}</span>
    </div>
    <div class="meter">
      <i :style="{ width: `${value}%`, '--accent': accent }" />
    </div>
  </div>
</template>
