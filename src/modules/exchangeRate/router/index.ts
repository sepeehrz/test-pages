import type {Router} from 'vue-router';

export function Routes(router: Router) {
  router.addRoute('main', {
    name: 'exchange-rate',
    path: '/exchange-rate',
    component: () => import('../views/index.vue')
  });
}
