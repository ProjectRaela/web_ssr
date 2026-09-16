<script setup>
import SiteHeader from './components/SiteHeader.vue'
import ReturnDock from './components/ReturnDock.vue'
</script>

<template>
  <div class="relative min-h-dvh">
    <div class="orb orb-a" />
    <div class="orb orb-b" />
    <div class="grain" />
    <SiteHeader />
    <main class="relative z-10">
      <router-view />
    </main>
    <ReturnDock />
  </div>
</template>
