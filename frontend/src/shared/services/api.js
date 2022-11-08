import axios from 'axios';
import { environment } from '../environments';

import { requestInterceptor } from './interceptors/requestInterceptor';

const api = axios.create({
  baseURL: environment.API_URL,
});

api.interceptors.request.use(request => requestInterceptor(request));

export { api };
