import {
  isEmpty,
  mapValues,
  pickBy,
  omitBy,
  map,
  isPlainObject,
  isArray as lodashIsArray
} from "lodash-es";

// eslint-disable-next-line @typescript-eslint/ban-types
type Obj = object;

type KeyObj<T> = Required<{
  [k in keyof T]: T[k] extends Obj ? KeyObj<T[k]> : string;
}>;

type GenericObject = Record<string, unknown>;

const isObject = (value: unknown): value is GenericObject =>
  isPlainObject(value);

const isArray = (value: unknown): value is unknown[] => lodashIsArray(value);

const getPath = (...array: string[]) =>
  array.filter((value) => !isEmpty(value)).join(".");

const deepMapObjectInt = <T extends Obj, R = T>(
  value?: T,
  mapper: (val: unknown, path: string) => unknown = (x) => x,
  basePath = ""
): R => {
  const objects = pickBy(value, (data) => isObject(data));
  const mappedObjects = mapValues(objects, (object: Obj, key) => {
    const objPath = getPath(basePath, key);
    const internalMappedObject = deepMapObjectInt(object, mapper, objPath);
    return mapper(internalMappedObject, objPath);
  });

  const arrays = pickBy(value, isArray);
  const mappedArrays = mapValues(arrays, (array: unknown[], key) => {
    const arrayPath = getPath(basePath, key);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const mappedArray = deepMapArrayInt(array, mapper, arrayPath);
    return mapper(mappedArray, arrayPath);
  });

  const basicProps = omitBy(value, (data) => isObject(data) || isArray(data));
  const mappedBasicProps = mapValues(basicProps, (prop, key) => {
    const propPath = getPath(basePath, key);
    return mapper(prop, propPath);
  });

  const result: unknown = {
    ...mappedBasicProps,
    ...mappedObjects,
    ...mappedArrays
  };
  return result as R;
};

const deepMapArrayInt = (
  array: unknown[],
  mapper: (value: unknown, path: string) => unknown,
  basePath = ""
): unknown[] =>
  map(array, (value, index) => {
    const elementPath = `${basePath}[${index}]`;
    if (isObject(value)) {
      const mappedObject = deepMapObjectInt(value, mapper, elementPath);
      return mapper(mappedObject, elementPath);
    }
    if (isArray(value)) {
      const mappedArray = deepMapArrayInt(value, mapper, elementPath);
      return mapper(mappedArray, elementPath);
    }
    return mapper(value, elementPath);
  });

const deepMapObject = <T extends Obj, R = T>(
  value?: T,
  mapper: (val: unknown, path: string) => unknown = (x) => x
): R => mapper(deepMapObjectInt<T, R>(value, mapper), "") as R;

/**
 * This function create an object whit the same internal structure that obj but with the access key in the values like tk.
 * Use this function with createHydratedMock<T>() from ts-auto-mock so you dont need to define a mock object.
 * When mocking the interface the plugin create empty arrays (and cannot be change) so if you need the array internal object key you have to use this function again with the array element type.
 * ONLY CALL CREATE HYDRATE MOCK FROM A NON CREATE REACT APP PROJECT. This function use a typescript compiler transformation plugin that is incompatible with create react app webpack config.
 * *
 * @param obj The base object to extract internal structure.
 * @return Returns the key object.
 */
export const getKeyObj = <T extends Obj>(obj: T): KeyObj<T> =>
  deepMapObject<T, KeyObj<T>>(obj, (value, path) => {
    if (isObject(value)) return value;
    return path;
  });
