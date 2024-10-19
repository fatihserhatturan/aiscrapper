import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OtherPage from '../components/OtherPage/OtherPage.vue';
import SearchComponent from '../components/SearchComponent/SearchComponent.vue';
import NavbarComponent from '../components/Navbar/NavbarComponent.vue';
import SidebarComponent from '../components/Sidebar/SidebarComponent.vue';

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
   { path: '/navbar',
    name:  'NavbarComponent',
    component: NavbarComponent
   },
   { path: '/sidebar',
    name:  'SidebarComponent',
    component: SidebarComponent
   },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
