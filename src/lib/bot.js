import { ref } from 'vue'
import { BOT_URL, isBotReady } from './constants'
import { Goals, reachGoal } from './metrika'

export { isBotReady }

export const botSoonOpen = ref(false)

export function openBotSoon() {
  botSoonOpen.value = true
}

export function closeBotSoon() {
  botSoonOpen.value = false
}

export function handleBotClick(event) {
  reachGoal(Goals.openBot)
  if (isBotReady) return
  event.preventDefault()
  openBotSoon()
}

export function goToBot() {
  reachGoal(Goals.openBot)
  if (!isBotReady) {
    openBotSoon()
    return
  }
  window.location.href = BOT_URL
}
