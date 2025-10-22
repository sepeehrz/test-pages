import {IMenuItems} from '../types/index';
import NavigationMenu from '@app/utils/menu/index';
import {Axios} from '@app/utils';

class GlobalRemote extends Axios {
  getMenu(): IMenuItems[] {
    try {
      const response = NavigationMenu.get();

      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }
}

export default GlobalRemote;
