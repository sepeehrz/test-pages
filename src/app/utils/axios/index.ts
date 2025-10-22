import axios, {Axios as AxiosClass, AxiosInstance} from 'axios';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// const getApiUrl = () => {
//   const isDev = urlParams.get('dev');
//   if (isDev) {
//     return 'https://localhost:5001/api';
//   }
//   if (window.location.host === 'app.lendroll.ir') {
//     return 'https://employee.api.lendroll.ir/api';
//   } else if (window.location.host === 'app.test.lendroll.ir') {
//     return 'https://employee.test.api.lendroll.ir/api';
//   } else {
//     return 'https://test.api.lendroll.ir/api';
//   }
// };
export class Axios extends AxiosClass {
  protected $axios: AxiosInstance;
  constructor() {
    super();
    this.$axios = axios;
    // this.$axios.defaults.baseURL = getApiUrl();
    this.$axios.defaults.headers.common.tenant = 'root';
    this.$axios.defaults.headers.common['accept-language'] = 'fa';
    this.$axios.defaults.validateStatus = () => true;
  }
}
