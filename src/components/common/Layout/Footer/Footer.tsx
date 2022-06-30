import { FC } from "~/types/react";
import { getClassName } from "~/utils/components";
import classes from "./Footer.module.scss";

export interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => (
  <div className={getClassName(classes.container, className)}>Footer</div>
);
