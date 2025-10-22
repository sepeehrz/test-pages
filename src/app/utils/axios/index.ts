import axios, {Axios as AxiosClass, AxiosInstance} from 'axios';

export class Axios extends AxiosClass {
  protected $axios: AxiosInstance;
  constructor() {
    super();
    this.$axios = axios;
    this.$axios.defaults.headers.common.tenant = 'root';
    this.$axios.defaults.headers.common['accept-language'] = 'fa';
    this.$axios.defaults.validateStatus = () => true;
  }
}
