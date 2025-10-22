import type {Router} from 'vue-router';

export function Routes(router: Router) {
  router.addRoute('main', {
    name: 'home-page',
    path: '/',
    component: () => import('../views/index.vue')
  });
}
