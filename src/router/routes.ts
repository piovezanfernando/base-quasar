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
      { path: 'subject', component: () => import('pages/registers/Subject.vue'), name: 'Subject' },
      { path: 'author', component: () => import('pages/registers/Author.vue'), name: 'Author' },
      { path: 'book', component: () => import('pages/registers/Book.vue'), name: 'Book' },
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
