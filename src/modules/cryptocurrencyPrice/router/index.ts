import type {Router} from 'vue-router';

export function Routes(router: Router) {
  router.addRoute('main', {
    name: 'cryptocurrency-price',
    path: '/cryptocurrency-price',
    component: () => import('../views/index.vue')
  });
}
