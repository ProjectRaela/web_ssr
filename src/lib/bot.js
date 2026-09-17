import { ref } from 'vue'
import { BOT_URL, isBotReady } from './constants'

export { isBotReady }

export const botSoonOpen = ref(false)

export function openBotSoon() {
  botSoonOpen.value = true
}

export function closeBotSoon() {
  botSoonOpen.value = false
}

export function handleBotClick(event) {
  if (isBotReady) return
  event.preventDefault()
  openBotSoon()
}

export function goToBot() {
  if (!isBotReady) {
    openBotSoon()
    return
  }
  window.location.href = BOT_URL
}
