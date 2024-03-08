import { RouteRecordRaw } from 'vue-router';

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
    ],
  },
  {
    path: '/registers',
    component: () => import('layouts/MainLayout.vue'),
    meta: { public: true },
    children: [
      { path: 'classification', component: () => import('pages/registers/Classification.vue'), name: 'Classification' },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
