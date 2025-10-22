import {App, Plugin} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import type {Router} from 'vue-router';
import {uiModule} from '@app/ui';
import {createPinia} from 'pinia';

type ModuleSetupContext = {
  app: App;
  router: Router;
};

type Module = (context: ModuleSetupContext) => void;

export function defineModule(setup: Module) {
  return setup;
}

export const startApplication: Plugin = (app: App) => {
  const pinia = createPinia();
  app.use(pinia);

  const router = createRouter({
    scrollBehavior() {
      return {top: 0};
    },
    history: createWebHistory(),
    routes: []
  });

  const context: ModuleSetupContext = {
    app,
    router
  };

  uiModule(context);

  const modulesPaths: any = import.meta.glob('../../modules/*/index.ts', {
    eager: true
  });
  for (const path in modulesPaths) {
    const setup = modulesPaths[path].default as Module | undefined;
    if (setup) {
      setup(context);
    }
  }

  app.use(router);
};
