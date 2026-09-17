import { YANDEX_METRIKA_ID } from './constants'

let booted = false

export function bootMetrika() {
  if (booted || !YANDEX_METRIKA_ID || typeof window === 'undefined') return
  booted = true

  const id = YANDEX_METRIKA_ID
  const src = `https://mc.yandex.ru/metrika/tag.js?id=${id}`

  ;(function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        ;(m[i].a = m[i].a || []).push(arguments)
      }
    m[i].l = 1 * new Date()
    for (let j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return
    }
    k = e.createElement(t)
    a = e.getElementsByTagName(t)[0]
    k.async = 1
    k.src = r
    a.parentNode.insertBefore(k, a)
  })(window, document, 'script', src, 'ym')

  window.ym(id, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  })
}
