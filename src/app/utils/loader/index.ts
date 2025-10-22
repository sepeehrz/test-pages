import {App, Plugin} from 'vue';
import {reactive} from 'vue';

export class Loader {
  private state;

  constructor(app: App) {
    this.state = reactive({
      loading: false,
      width: 40,
      color: '#f0c300',
      size: 24
    });

    app.provide('loader', this);
  }

  setLoading(value: boolean) {
    this.state.loading = value;
  }
  setWidth(value: number) {
    this.state.width = value;
  }
  setColor(value: string) {
    this.state.color = value;
  }
  setSize(value: number) {
    this.state.size = value;
  }

  get loading() {
    return this.state.loading;
  }
  get width() {
    return this.state.width;
  }
  get color() {
    return this.state.color;
  }
  get size() {
    return this.state.size;
  }
}

export const LoaderPlugin: Plugin = {
  install(app: App) {
    const instance = new Loader(app);
    app.config.globalProperties.$loader = instance;
    app.provide('loader', instance);
  }
};

export default LoaderPlugin;
