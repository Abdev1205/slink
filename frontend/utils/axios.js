import axios from 'axios';
import { ApiUrl } from './BaseUrl';

const api = axios.create({
  baseURL: ApiUrl,
});


export default api;
