import CryptoCurrencyPriceRemote from '../remote';
import type {IMarketResponse} from '../../types';

export class CryptoCurrencyPriceRepository {
  private remote: CryptoCurrencyPriceRemote;

  constructor(remote: CryptoCurrencyPriceRemote) {
    this.remote = remote;
  }

  getCurrency(params: {
    page: number;
    pageSize: number;
  }): Promise<IMarketResponse[]> {
    try {
      const response = this.remote.getCurrency(params);

      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }
}

export default new CryptoCurrencyPriceRepository(
  new CryptoCurrencyPriceRemote()
);
