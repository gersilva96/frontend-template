import { Optional } from "~/types/utils";
import { notUndefined } from "~/utils/types";

export const getClassName = (...classnames: Optional<string>[]): string =>
  classnames.filter(notUndefined).join(" ");
