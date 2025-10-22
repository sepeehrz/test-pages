/// <reference types="vite/client" />
/// <reference types="vue" />

declare module '*.vue' {
  import {defineComponent} from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
