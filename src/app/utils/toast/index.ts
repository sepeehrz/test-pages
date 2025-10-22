import type {IToast} from './types';
import {App, Plugin, h, render} from 'vue';
import ToastComponent from '@app/ui/components/toast.vue';

export class Toast {
  options: IToast = {
    timeout: 4000,
    withClose: false,
    withCounter: true
  };
  mountToastCheck = false;
  $root: any = {};
  timeout: any;

  constructor(options: IToast = {}) {
    this.options = Object.assign(this.options, options);
  }

  private ensureRoot() {
    if (!this.$root || !this.$root.ctx) {
      throw new Error(
        'Toast root instance is not available! Make sure the plugin is properly installed.'
      );
    }
  }

  showToast(toast: IToast = {}, position?: string) {
    this.mountToast();
    toast.id = 'toast.' + Date.now();
    toast.counter = 1;

    const toastItems = Object.assign({}, this.options, toast);

    const commitData = {
      position: position,
      show: true,
      toastData: toastItems
    };
    this.ensureRoot();
    this.$root.ctx.commit(commitData);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(
      () => {
        this.unMountToast();
      },
      toast.timeout ? toast.timeout : this.options.timeout
    );
  }
  mountToast() {
    if (this.mountToastCheck === false) {
      const vNode = h(ToastComponent);
      const container = document.createElement('div');
      container.setAttribute('id', 'v-toast');
      document.querySelector('#app')?.appendChild(container);
      render(vNode, container);
      this.mountToastCheck = true;
      this.$root = vNode.component;
      return this.$root;
    }
  }
  unMountToast() {
    if (this.mountToastCheck) {
      const element = document.getElementById('v-toast');
      element?.remove();
      this.mountToastCheck = false;
    }
  }
}

export const ToastPlugin: Plugin = {
  install(app: App, options: IToast) {
    const instance = new Toast(options);
    app.config.globalProperties.toast = instance;
    app.provide('toast', instance);
  }
};

export default ToastPlugin;
