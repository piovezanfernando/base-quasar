import { RouteRecordRaw } from 'vue-router';
import menuConfig from 'assets/menu-config.json';

// Use Vite's glob import to load all page components
const pageModules = import.meta.glob('../pages/*.vue');

// Generate dynamic routes from menu config
const dynamicRoutes = menuConfig
  .filter(item => item.component && item.route)
  .map(item => ({
    path: item.route.replace('/', ''), // Remove leading slash for children routes
    component: pageModules[`../pages/${item.component}`],
    name: item.name
  }));

const routes: RouteRecordRaw[] = [
  {
    path: '/Login',
    component: () => import('pages/Login.vue'),
    meta: { public: false },
    name: 'Login',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { public: true },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name: 'Index' },
      ...dynamicRoutes, // Inject dynamic routes
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
