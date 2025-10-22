import GlobalRemote from '../remote';
import {IMenuItems} from '../types';

export class GlobalRepository {
  private remote: GlobalRemote;

  constructor(remote: GlobalRemote) {
    this.remote = remote;
  }
  getMenu(): IMenuItems[] {
    try {
      const response = this.remote.getMenu();
      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }
}

export default new GlobalRepository(new GlobalRemote());
