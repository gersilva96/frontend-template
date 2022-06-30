import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { produce } from "immer";
import { pickBy } from "lodash-es";
import { AppResponse, AppError, AppSuccess } from "~/types/request";
import { notUndefined } from "~/utils/types";

export const handleError = (axiosErr: AxiosError | any): AppError => {
  let errorResponse: AppError;
  if (axiosErr.response) {
    const responseError = axiosErr.response;
    errorResponse = {
      success: false,
      error: {
        code: responseError.request.status,
        message: responseError.request.statusText,
        url: responseError.config.url,
        method: responseError.config.method?.toUpperCase()
      }
    };
  } else {
    errorResponse = {
      success: false,
      error: { message: "ERR_CONNECTION_REFUSED" }
    };
  }
  return errorResponse;
};

export const handleResponse = <T>(axiosRes: AxiosResponse): AppSuccess<T> => {
  const response: AppSuccess<T> = {
    success: true,
    statusCode: axiosRes.status,
    payload: axiosRes.data
  };
  return response;
};

export const isResponseSuccess = <T = any>(
  response: AppResponse<T>
): response is AppSuccess<T> => response.success;

export const isResponseError = <T = any>(
  response: AppResponse<T>
): response is AppError => !response.success;

export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<AppResponse<T>> => {
  const requestConfig: AxiosRequestConfig = produce(config, (draftConfig) => {
    draftConfig.params = pickBy(config.params, notUndefined);
    draftConfig.timeout = 10000;
  });
  let response: AxiosResponse;
  let result: AppResponse<T>;
  try {
    response = await axios.request(requestConfig);
    result = handleResponse<T>(response);
  } catch (error) {
    result = handleError(error);
  }
  return result;
};
