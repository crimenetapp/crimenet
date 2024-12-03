import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Submit from '../views/Submit.vue'
import IncidentDetail from '../views/IncidentDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/submit',
      name: 'submit',
      component: Submit
    },
    {
      path: '/incident/:id',
      name: 'incident-detail',
      component: IncidentDetail
    }
  ]
})

export default router
