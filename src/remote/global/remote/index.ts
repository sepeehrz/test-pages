import {IMenuItems} from '../types/index';
import NavigationMenu from '@app/utils/menu/index';
import {Axios, HandleError, IRequestResponse} from '@app/utils';

class GlobalRemote extends Axios {
  getMenu(): IMenuItems[] {
    try {
      const response = NavigationMenu.get();
      // if (response.status !== 200) {
      //   throw HandleError.handle(response.status, response.data.message);
      // }

      return response;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
  async getCurrency(params: {
    page: number;
    pageSize: number;
  }): Promise<IRequestResponse> {
    try {
      const response = await this.$axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${params.pageSize}&page=${params.page}`
      );

      if (response.status !== 200) {
        throw HandleError.handle(response.status);
      }
      return response;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
  async getExchangerate(currency: string): Promise<IRequestResponse> {
    try {
      const response = await this.$axios.get(
        `https://api.frankfurter.app/latest?from=${currency}`
      );

      if (response.status !== 200) {
        throw HandleError.handle(response.status);
      }
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
  async getWebSocket(): Promise<IRequestResponse> {
    try {
      const response = await this.$axios.get(
        `wss://ws.coincap.io/prices?assets=bitcoin,ethereum`
      );

      if (response.status !== 200) {
        throw HandleError.handle(response.status);
      }
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
}

export default GlobalRemote;
