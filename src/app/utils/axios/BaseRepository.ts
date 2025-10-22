import {BaseRemote} from './BaseRemote';
export class BaseRepository<T extends BaseRemote> {
  protected remote: T;

  constructor(remote: T) {
    this.remote = remote;
  }

  async $query(params?: any): Promise<any> {
    try {
      const response = await this.remote.$query(params);
      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }

  async $get(id: number | string | string[]): Promise<any> {
    try {
      const response = await this.remote.$get(id);
      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }

  async $update(id: number | string, obj: any): Promise<any> {
    try {
      const response = await this.remote.$update(id, obj);

      return response.data;
    } catch (error) {
      throw new Error('failed');
    }
  }

  async $save(obj: any): Promise<any> {
    try {
      const response = await this.remote.$save(obj);

      return response.data;
    } catch (error) {
      throw new Error('failed');
    }
  }

  async $delete(id: number | string): Promise<any> {
    try {
      const response = await this.remote.$delete(id);

      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }

  async $restore(id: number | string): Promise<any> {
    try {
      const response = await this.remote.$restore(id);

      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }

  async $export(params: any, path?: string): Promise<any> {
    try {
      const response = await this.remote.$export(params, path);
      return response;
    } catch (error) {
      throw new Error('failed');
    }
  }
}
