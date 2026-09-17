import { createRouter, createWebHistory } from 'vue-router'
import Landing from './pages/Landing.vue'
import Home from './pages/Home.vue'
import Heroine from './pages/Heroine.vue'
import Logos from './pages/Logos.vue'
import { heroines } from './data/heroines'
import { CHOICE_TAIL, choicePath, landingPath, isLocale } from './lib/paths'
import { guessLocale, setLocale, t } from './lib/locale'
import { applySeo } from './lib/seo'
import { OG_IMAGE, SITE_URL, YANDEX_METRIKA_ID } from './lib/constants'

function keepQuery(to, path) {
  return { path, query: to.query }
}

function fill(template, vars) {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, value ?? ''),
    template,
  )
}

function seoForRoute(to) {
  const lang = isLocale(to.params.lang) ? to.params.lang : 'ru'
  const path = to.path === '/' ? `/${lang}` : to.path

  if (to.name === 'landing') {
    return {
      title: t('seo.landingTitle'),
      description: t('seo.landingDescription'),
      path,
      lang,
    }
  }

  if (to.name === 'choice') {
    return {
      title: t('seo.choiceTitle'),
      description: t('seo.choiceDescription'),
      path,
      lang,
    }
  }

  if (to.name === 'heroine') {
    const id = to.params.id
    const name = t(`heroines.${id}.name`)
    const lead = t(`heroines.${id}.lead`)
    return {
      title: fill(t('seo.heroineTitle'), { name }),
      description: fill(t('seo.heroineDescription'), { lead }),
      path,
      lang,
      image: `${SITE_URL}/heroes/${id}/full.jpg`,
    }
  }

  return {
    title: 'Raela',
    description: t('seo.landingDescription'),
    path,
    lang,
    image: OG_IMAGE,
  }
}

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      redirect: (to) => keepQuery(to, landingPath(guessLocale())),
    },
    {
      path: `/${CHOICE_TAIL}/:id?`,
      redirect: (to) => keepQuery(to, choicePath(guessLocale(), to.params.id)),
    },
    {
      path: '/:lang(en|ru)',
      name: 'landing',
      component: Landing,
    },
    {
      path: `/:lang(en|ru)/${CHOICE_TAIL}`,
      name: 'choice',
      component: Home,
    },
    {
      path: `/:lang(en|ru)/${CHOICE_TAIL}/:id`,
      name: 'heroine',
      component: Heroine,
      beforeEnter: (to) => {
        if (!heroines.some((h) => h.id === to.params.id)) {
          return keepQuery(to, choicePath(to.params.lang))
        }
      },
    },
    { path: '/logos', name: 'logos', component: Logos },
  ],
})

router.beforeEach((to) => {
  if (isLocale(to.params.lang)) setLocale(to.params.lang)
})

router.afterEach((to) => {
  applySeo(seoForRoute(to))
  if (typeof window.ym === 'function') {
    window.ym(YANDEX_METRIKA_ID, 'hit', window.location.href)
  }
})
