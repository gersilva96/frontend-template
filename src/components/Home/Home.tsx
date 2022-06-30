import { FC } from "~/types/react";
import { Example } from "./Example/Example";
import classes from "./Home.module.scss";

export const Home: FC = () => (
  <div className={classes.container}>
    <Example />
  </div>
);
