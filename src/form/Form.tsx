import { ReactNode } from "react";
import arrayMutators from "final-form-arrays";
import {
  Form as FinalForm,
  FormProps as FinalFormProps
} from "react-final-form";
import { ReactElement } from "~/types/react";

interface FormProps<T> extends FinalFormProps<T> {
  children?: ReactNode;
  id?: string;
  noValidate?: boolean;
  postProcessValues?: (formValues: T) => T;
}

export const Form = <T,>({
  postProcessValues,
  onSubmit,
  children,
  className,
  initialValues,
  mutators,
  validate,
  validateOnBlur,
  id,
  noValidate = true
}: FormProps<T>): ReactElement => {
  const wrappedOnSubmit: typeof onSubmit = (formValues, ...args) => {
    if (postProcessValues !== undefined) {
      return onSubmit(postProcessValues(formValues), ...args);
    }

    return onSubmit(formValues, ...args);
  };
  return (
    <FinalForm<T>
      initialValues={initialValues}
      mutators={mutators ?? { ...arrayMutators }}
      onSubmit={wrappedOnSubmit}
      validate={validate}
      validateOnBlur={validateOnBlur}
    >
      {(props) => (
        <form
          onSubmit={props.handleSubmit}
          className={className}
          noValidate={noValidate}
          id={id}
        >
          {children}
        </form>
      )}
    </FinalForm>
  );
};
