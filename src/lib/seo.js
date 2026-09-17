import { OG_IMAGE, SITE_URL } from './constants'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function applySeo({ title, description, path = '/', image = OG_IMAGE, lang = 'ru' }) {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

  document.title = title
  document.documentElement.lang = lang

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
  upsertMeta('name', 'theme-color', '#0B0809')

  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', 'Raela')
  upsertMeta('property', 'og:locale', lang === 'ru' ? 'ru_RU' : 'en_US')
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:image:alt', 'Raela')

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', image)

  upsertLink('canonical', url)
}
