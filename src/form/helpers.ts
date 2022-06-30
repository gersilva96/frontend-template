import { useCallback } from "react";
import { Optional } from "~/types/utils";
import { notUndefined } from "~/utils/types";

export const notUndefinedValidatorGetter =
  <T>(errorMessage: string) =>
  (value?: T): Optional<string> =>
    notUndefined(value) ? undefined : errorMessage;

export const useNotUndefinedValidatorGetter = <T>(
  message: string
): ((value?: T) => Optional<string>) =>
  useCallback(
    (value?: T) => notUndefinedValidatorGetter<T>(message)(value),
    [message]
  );
