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
  getCurrency(params: {page: number; pageSize: number}): Promise<any> {
    try {
      const response = this.remote.getCurrency(params);
      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }
  async getExchangerate(currency: string): Promise<any> {
    try {
      const response = this.remote.getExchangerate(currency);

      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }
  async getWebSocket(): Promise<any> {
    try {
      const response = this.remote.getWebSocket();

      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }
}

export default new GlobalRepository(new GlobalRemote());
