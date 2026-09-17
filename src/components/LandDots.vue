<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

const active = ref(props.slides[0]?.id ?? '')
let observer

function observe() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target?.id) active.value = visible.target.id
    },
    { threshold: [0.35, 0.55, 0.75] },
  )
  props.slides.forEach((slide) => {
    const el = document.getElementById(slide.id)
    if (el) observer.observe(el)
  })
}

onMounted(observe)
watch(
  () => props.slides.map((slide) => slide.id).join(),
  () => observe(),
)
onUnmounted(() => observer?.disconnect())

function go(event, id) {
  event.preventDefault()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  history.replaceState(null, '', `#${id}`)
}
</script>

<template>
  <nav class="land-dots" :aria-label="label">
    <a
      v-for="slide in slides"
      :key="slide.id"
      :href="`#${slide.id}`"
      :class="{ 'is-on': slide.id === active }"
      :aria-current="slide.id === active ? 'location' : undefined"
      :aria-label="slide.label"
      @click="go($event, slide.id)"
    />
  </nav>
</template>
