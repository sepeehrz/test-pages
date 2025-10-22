import {Axios, HandleError} from '@app/utils';
import type {IMarketResponse} from '../../types';

class CryptoCurrencyPriceRemote extends Axios {
  async getCurrency(params: {
    page: number;
    pageSize: number;
  }): Promise<IMarketResponse[]> {
    try {
      const response = await this.$axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${params.pageSize}&page=${params.page}`
      );
      return response.data;
    } catch (error) {
      HandleError.handle(error);
      throw new Error('failed');
    }
  }
}

export default CryptoCurrencyPriceRemote;
