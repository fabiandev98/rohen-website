import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ui from '@nuxt/ui/vue-plugin'
import './style.css'
import App from './App.vue'
import { i18n } from './i18n'
import HomeView from './views/home/HomeView.vue'
import InfoView from './views/info/InfoView.vue'
import ServiceDetailView from './views/services/ServiceDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/services', name: 'services', component: InfoView, props: { page: 'servicios' } },
    {
      path: '/services/:serviceId',
      name: 'service',
      component: ServiceDetailView,
      props: (route) => ({ serviceId: route.params.serviceId }),
    },
    { path: '/about', name: 'about', component: InfoView, props: { page: 'nosotros' } },
    { path: '/contact', name: 'contact', component: InfoView, props: { page: 'contacto' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})

createApp(App).use(router).use(ui).use(i18n).mount('#app')
