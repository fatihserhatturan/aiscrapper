import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScenarioView from '../views/ScenarioView.vue'
import OtherPage from '../components/OtherPage/OtherPage.vue';
import SearchComponent from '../components/SearchComponent/SearchComponent.vue';
import NavbarComponent from '../components/Navbar/NavbarComponent.vue';
import SidebarComponent from '../components/Sidebar/SidebarComponent.vue';
import DocumentComponent from '../components/Document/DocumentComponent.vue';
import ScenarioInspectComponent from '../components/ScenarioInspect/ScenarioInspectComponent.vue';
import ScenarioDocumentComponent from '../components/ScenarioDocument/ScenarioDocumentComponent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/scenarioInspect',
    name: 'scenarioInspect',
    component: ScenarioInspectComponent
  },
  {
    path: '/scenarioDocument',
    name: 'scenarioDocument',
    component: ScenarioDocumentComponent
  },
  {
    path: '/scenario',
    name: 'scenario',
    component: ScenarioView
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
   { path: '/document/:documentId',
    name:  'DocumentPreview',
    component: DocumentComponent
   },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
