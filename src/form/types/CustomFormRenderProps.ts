import { FormState } from "final-form";

export interface CustomFormState<FormValues, InitialFormValues, E = unknown>
  extends FormState<FormValues, InitialFormValues> {
  hasError: boolean;
  showGlobalError: boolean;
  validationError: E;
}

export type TouchedObj = { [key: string]: boolean };
