<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFoot from './components/SiteFoot.vue'
import ReturnDock from './components/ReturnDock.vue'
import CookieBanner from './components/CookieBanner.vue'
import ComingSoonModal from './components/ComingSoonModal.vue'
import { isChoicePath } from './lib/paths'

const route = useRoute()
const onChoice = computed(() => isChoicePath(route.path))
</script>

<template>
  <div class="relative min-h-dvh land-page" :class="{ 'has-dock': onChoice }">
    <i class="land-grain" aria-hidden="true" />
    <i class="land-page__rule is-left" aria-hidden="true" />
    <i class="land-page__rule is-right" aria-hidden="true" />
    <SiteHeader />
    <main class="relative z-10">
      <router-view />
    </main>
    <SiteFoot />
    <ReturnDock v-if="onChoice" />
    <CookieBanner />
    <ComingSoonModal />
  </div>
</template>
