import { createRouter, createWebHistory } from 'vue-router'
import Landing from './pages/Landing.vue'
import Home from './pages/Home.vue'
import Heroine from './pages/Heroine.vue'
import Logos from './pages/Logos.vue'
import { heroines } from './data/heroines'
import { CHOICE_TAIL, choicePath, landingPath, isLocale } from './lib/paths'
import { guessLocale, setLocale } from './lib/locale'

function keepQuery(to, path) {
  return { path, query: to.query }
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
  if (to.name !== 'landing') document.title = 'Raela'
})
