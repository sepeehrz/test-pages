import {Axios, HandleError} from '@app/utils';
import type {IExchangeRatesResponse} from '../../types';

class ExchangeRateRemote extends Axios {
  async getExchangerate(currency: string): Promise<IExchangeRatesResponse> {
    try {
      const response = await this.$axios.get(
        `https://api.frankfurter.app/latest?from=${currency}`
      );
      return response.data;
    } catch (error) {
      HandleError.handle(error);
      throw new Error('failed');
    }
  }
}

export default ExchangeRateRemote;
