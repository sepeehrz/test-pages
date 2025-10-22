import {App, Plugin, createVNode, render} from 'vue';
import AlertView from '@app/ui/components/dialog/components/views/alert.vue';
import ConfirmView from '@app/ui/components/dialog/components/views/confirm.vue';
import PromptView from '@app/ui/components/dialog/components/views//prompt.vue';
import dialogComponent from '@app/ui/components/dialog/components/dialog.vue';
import type {IDialog} from '@app/ui/components/dialog/types/types';

class Dialog {
  options: IDialog = {
    persistent: false
  };
  app: App;
  $root: any = null;
  mountDialogCheck = false;
  constructor(app: App, options: IDialog) {
    this.app = app;
    this.options = Object.assign(this.options, options);
  }
  alert(dialog: IDialog = {}) {
    dialog.component = AlertView;
    dialog.ok_txt = dialog.ok_txt || 'باشه';
    dialog.type = dialog.type || 'warning';
    return this.show(dialog);
  }
  prompt(dialog: IDialog = {}) {
    dialog.component = PromptView;
    dialog.type = dialog.type || 'question';
    dialog.ok_txt = dialog.ok_txt || 'تایید';
    dialog.cancel_txt = dialog.cancel_txt || 'منصرف شدم';
    return this.show(dialog);
  }
  confirm(dialog: IDialog = {}) {
    dialog.component = ConfirmView;
    dialog.title = dialog.title || 'آیا از انجام این کار مطمعن هستید؟';
    dialog.message = dialog.message;
    dialog.type = dialog.type || 'warning';
    dialog.ok_txt = dialog.ok_txt || 'انجام بده';
    dialog.cancel_txt = dialog.cancel_txt || 'منصرف شدم';
    return this.show(dialog);
  }
  show(dialog: IDialog = {}) {
    if (this.mountDialogCheck === false) {
      this.$root = this.mounted();
    }
    return new Promise((resolve, reject) => {
      dialog.id = 'dialog.' + Date.now();
      dialog.resolve = resolve;
      dialog.reject = reject;
      const dialogItem = Object.assign({}, this.options, dialog);
      this.$root.ctx.commit(dialogItem);
    });
  }

  mounted() {
    if (this.mountDialogCheck === false) {
      const container = document.createElement('div');
      container.setAttribute('id', 'dialogs');
      document.querySelector('#app')?.appendChild(container);

      const vNode = createVNode(dialogComponent);
      vNode.appContext = this.app._context;
      render(vNode, container);
      this.mountDialogCheck = true;
      return vNode.component;
    }
  }
}

export const DialogPlugin: Plugin = {
  install(app: App, options: IDialog) {
    const instance = new Dialog(app, options);
    app.config.globalProperties.dialog = instance;
    app.provide('dialog', instance);
  }
};
export default DialogPlugin;
