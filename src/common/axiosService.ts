import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IAxiosResponse } from './models/IAxiosResponse';

export class AxiosService {
  constructor(
    private readonly config: AxiosRequestConfig
  ) {}

  async execute<T>(request: AxiosRequestConfig): Promise<IAxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios({
        ...this.config,
        ...request,
        headers: {
          ...this.config.headers,
          ...request.headers,
        },
      });

      return {
        statusCode: response.status,
        message: response.statusText,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        statusCode: axiosError.response?.status ?? 500,
        message:
          axiosError.response?.statusText ??
          axiosError.message,
        data: null,
      };
    }
  }
}

//uso

/**
const api = new AxiosService({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '123456789',
  },
});


const response = await api.execute<User>({
  method: 'POST',
  url: '/users',
  headers: {
    Authorization: 'Bearer token123'
  },
  data: <CreateUserRequest>{
    name: 'Juan',
    email: 'juan@test.com'
  }
})

console.log(response.statusCode); // 200
console.log(response.message);    // OK
console.log(response.data);       // User[]
*/
