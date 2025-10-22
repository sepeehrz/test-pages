import {inject} from 'vue';
import {Loader} from '@app/utils/loader/index';

export function useLoading() {
  const loader = inject('loader') as Loader | undefined;
  if (!loader) {
    throw new Error('Loader plugin is not installed.');
  }
  return loader;
}
