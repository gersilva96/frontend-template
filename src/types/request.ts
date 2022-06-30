export interface AppSuccess<T> {
  payload: T;
  statusCode: number;
  success: true;
}

export interface AppError {
  error: {
    code?: number;
    message: string;
    method?: string;
    url?: string;
  };
  success: false;
}

export type AppResponse<T> = AppSuccess<T> | AppError;

export type RequestResponse<T> = Promise<AppResponse<T>>;

export enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT"
}
