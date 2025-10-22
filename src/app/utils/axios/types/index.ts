import type {
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
  AxiosResponse
} from 'axios';

export interface IData {
  validationError: boolean;
  message: string;
  data: object | boolean | object[];
}
export interface IRequestResponse<T = any, D = any> {
  data: T | IData;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}

export interface IBaseRemote {
  $get(id: number | string | string[]): Promise<AxiosResponse>;
  $save(obj: any): Promise<AxiosResponse>;
  $query(params?: any): Promise<AxiosResponse>;
  $update(id: number | string, obj: any): Promise<AxiosResponse>;
  $delete(id: number | string): Promise<AxiosResponse>;
  $restore(id: number | string): Promise<AxiosResponse>;
  $export(headers: object, path?: string): Promise<AxiosResponse>;
}
