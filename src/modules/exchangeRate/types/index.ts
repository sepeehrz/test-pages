export interface IExchangeRatesResponse {
  amount?: number;
  base?: string;
  date?: string;
  rates?: Record<CurrencyCode, number>;
}

export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'CNY'
  | 'JPY'
  | 'INR'
  | 'KRW'
  | 'TRY'
  | 'BRL'
  | 'ZAR'
  | 'MXN'
  | 'NZD'
  | 'SGD'
  | 'MYR'
  | 'NOK'
  | 'SEK'
  | 'DKK'
  | 'THB'
  | 'HUF'
  | 'PLN'
  | 'RON'
  | 'PHP'
  | 'HKD'
  | 'ILS'
  | 'IDR'
  | 'ISK'
  | 'BGN'
  | 'CZK';
