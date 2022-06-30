import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { produce } from "immer";
import { pickBy } from "lodash-es";
import { AppResponse } from "~/types/request";
import { handleError, handleResponse } from "~/utils/request";
import { notUndefined } from "~/utils/types";

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
