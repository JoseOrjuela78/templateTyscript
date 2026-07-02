export interface IAxiosResponse<T>{
      statusCode: number;
      message: string;
      data: T | null;
};