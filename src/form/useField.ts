import { FieldValidator } from "final-form";
import { useField as useFinalFormField } from "react-final-form";
import { Optional } from "~/types/utils";
import { CustomFieldRenderProps } from "./types/CustomFieldRenderProps";
import { useRecipeFunction } from "./useRecipeFunction";

export const useField = <V, E = string>(
  fieldName: string,
  validate?: FieldValidator<Optional<V>>,
  beforeSubmit?: () => void
): CustomFieldRenderProps<Optional<V>, E> => {
  const {
    input: { value, onChange, ...inputProps },
    meta,
    ...otherProps
  } = useFinalFormField<Optional<V>>(fieldName, { validate, beforeSubmit });

  const recipeFunction = useRecipeFunction(value, onChange);

  // Final form treats empty string and undefined as the same value.
  // We convert empty string to undefined to avoid having to check
  // for both cases in client code.
  const castedValue =
    (value as unknown as Optional<V> | "") === "" ? undefined : value;
  return {
    input: {
      value: castedValue as unknown as Optional<V>,
      onChange: recipeFunction,
      ...inputProps
    },
    meta: {
      ...meta,
      error: (meta.error as E) || (meta.submitError as E),
      validationError: meta.error as E,
      submitError: meta.submitError as E
    },
    ...otherProps
  };
};
