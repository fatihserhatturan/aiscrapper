import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OtherPage from '../components/OtherPage.vue';
import SearchComponent from '../components/SearchComponent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/other',
    name:  'otherPage',
    component: OtherPage
   },
   { path: '/search',
    name:  'SearchComponent',
    component: SearchComponent
   },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
