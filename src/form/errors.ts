import { FORM_ERROR } from "final-form";
import { TFunction } from "i18next";
import { Optional } from "~/types/utils";

export { FORM_ERROR } from "final-form";

// eslint-disable-next-line @typescript-eslint/ban-types
type Obj = object;

export interface FormErrorBaseData {
  [FORM_ERROR]?: string;
}

export type FormErrorData<T> = Partial<{
  [k in keyof T]: T[k] extends Obj ? FormErrorData<T[k]> : Optional<string>;
}> &
  FormErrorBaseData;

export type FormValidator<FormData> = (
  t: TFunction,
  data: FormData
) => Optional<FormErrorData<FormData>>;

export type FormSubmitValidator<Error, FormData> = (
  t: TFunction,
  error?: Error
) => Optional<FormErrorData<FormData>>;
