import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Heroine from './pages/Heroine.vue'
import { heroines } from './data/heroines'

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/:id',
      name: 'heroine',
      component: Heroine,
      beforeEnter: (to) => {
        if (!heroines.some((h) => h.id === to.params.id)) return { name: 'home' }
      },
    },
  ],
})
