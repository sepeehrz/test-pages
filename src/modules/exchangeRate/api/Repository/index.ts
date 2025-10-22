import ExchangeRateRemote from '../remote';
import type {IExchangeRatesResponse} from '../../types';

export class ExchangeRateRepository {
  private remote: ExchangeRateRemote;

  constructor(remote: ExchangeRateRemote) {
    this.remote = remote;
  }

  async getExchangerate(currency: string): Promise<IExchangeRatesResponse> {
    try {
      const response = this.remote.getExchangerate(currency);

      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }
}

export default new ExchangeRateRepository(new ExchangeRateRemote());
