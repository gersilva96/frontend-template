import { FieldMetaState, FieldRenderProps } from "react-final-form";

interface CustomFieldMetaState<V, E = unknown> extends FieldMetaState<V> {
  error: E;
  submitError: E;
  validationError: E;
}

export interface CustomFieldRenderProps<
  FieldValue,
  E = unknown,
  T extends HTMLElement = HTMLElement
> extends FieldRenderProps<FieldValue, T> {
  meta: CustomFieldMetaState<FieldValue, E>;
}
