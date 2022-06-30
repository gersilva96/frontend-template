import { useCallback } from "react";
import { produce } from "immer";
import { isEqual } from "lodash-es";

export type RecipeFunction<T> = (v: T) => void;

export type ValueOrRecipe<T> = T | RecipeFunction<T>;

export type ValueOrRecipeFunction<T> = (v: ValueOrRecipe<T>) => void;

const isRecipeFunction = <T>(
  value: ValueOrRecipe<T>
): value is RecipeFunction<T> => typeof value === "function";

export const getValueOfValueOrRecipe = <T>(
  value: T,
  updateValue: ValueOrRecipe<T>
): T => {
  if (isRecipeFunction(updateValue)) {
    return produce(value, updateValue);
  }
  return updateValue;
};

export const useRecipeFunction = <T>(
  value: T,
  setValue: (value: T) => void
): ((c: ValueOrRecipe<T>) => void) =>
  useCallback(
    (updateValue: ValueOrRecipe<T>) => {
      const newValue = getValueOfValueOrRecipe(value, updateValue);
      if (!isEqual(newValue, value)) {
        setValue(newValue);
      }
    },
    [setValue, value]
  );
