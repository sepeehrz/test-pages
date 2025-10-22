import {Axios} from './index';
import {IBaseRemote, IRequestResponse} from './types';
import {HandleStatus} from '@app/utils';
export class BaseRemote extends Axios implements IBaseRemote {
  path;
  constructor(path?: string) {
    super();
    this.path = path ? path : '';
  }
  get axios() {
    return this.$axios;
  }

  async $get(id: number | string | string[]): Promise<IRequestResponse> {
    try {
      const response = await this.$axios.get(this.path + '/' + id);

      HandleStatus.status(
        response.status,
        response.data.message,
        response.status === 200 ? false : true
      );

      return response.data;
    } catch (error) {
      throw new Error('failed');
    }
  }
  async $save(data: any): Promise<IRequestResponse> {
    try {
      const response = await this.$axios.post(this.path, data);

      HandleStatus.status(response.status, response.data.message);

      return response.data;
    } catch (error: any) {
      throw new Error(error?.message || 'failed');
    }
  }

  async $query(params?: any): Promise<IRequestResponse> {
    try {
      const response = await this.$axios.get(this.path, {params});

      HandleStatus.status(
        response.status,
        response.data.message,
        response.status === 200 ? false : true
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error?.message || 'failed');
    }
  }
  async $update(id: number | string, obj: any): Promise<IRequestResponse> {
    try {
      const response = await this.$axios.put(this.path + '/' + id, obj);

      HandleStatus.status(response.status, response.data.message);

      return response.data;
    } catch (error) {
      throw new Error('failed');
    }
  }
  async $delete(id: number | string): Promise<IRequestResponse> {
    try {
      const response = await this.$axios.delete(this.path + '/' + id);

      HandleStatus.status(response.status, response.data.message);

      return response.data;
    } catch (error) {
      throw new Error('failed');
    }
  }
  async $restore(id: number | string): Promise<IRequestResponse> {
    try {
      const response = await this.$axios.put(
        this.path + '/' + 'restore' + '/' + id
      );

      HandleStatus.status(response.status, response.data.message);

      return response.data;
    } catch (error) {
      throw new Error('failed');
    }
  }
  async $export(params: object, path?: string) {
    try {
      const response = await this.$axios.get(path ? path : this.path, {
        params,
        responseType: 'arraybuffer'
      });

      HandleStatus.status(response.status, response.data.message);

      return response.data;
    } catch (error) {
      throw new Error('failed');
    }
  }
}
