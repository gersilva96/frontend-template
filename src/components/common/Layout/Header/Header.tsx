import { FC } from "~/types/react";
import { getClassName } from "~/utils/components";
import classes from "./Header.module.scss";

export interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => (
  <header className={getClassName(classes.container, className)}>Header</header>
);
