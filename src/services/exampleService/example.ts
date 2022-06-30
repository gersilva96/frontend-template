import urlJoin from "url-join";
import { CONFIG } from "~/config";
import { request } from "~/services/common";
import { HTTPMethods, RequestResponse } from "~/types/request";
import { GenericObject } from "~/types/utils";

const exampleApiBaseUrl = CONFIG.SERVICES.EXAMPLE.BASE_URL as string;
const exampleBasePath = "/example";

export const getSomethingById = (id: string): RequestResponse<string> => {
  const url = urlJoin(exampleApiBaseUrl, exampleBasePath, id);
  return request({
    method: HTTPMethods.GET,
    url
  });
};

export const postSomething = (
  something: GenericObject
): RequestResponse<string> => {
  const url = urlJoin(exampleApiBaseUrl, exampleBasePath);
  return request({
    method: HTTPMethods.POST,
    data: something,
    url
  });
};
