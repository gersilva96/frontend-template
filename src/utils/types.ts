import { isArray } from "lodash-es";
import { ElementOrArray, Optional } from "~/types/utils";

export const notUndefined = <T>(x: Optional<T>): x is T => x !== undefined;

export const getAsArray = <T>(elementOrArray: ElementOrArray<T>): T[] =>
  isArray(elementOrArray) ? elementOrArray : [elementOrArray];
