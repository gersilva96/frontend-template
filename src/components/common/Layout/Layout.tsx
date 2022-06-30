import { FCC } from "~/types/react";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import classes from "./Layout.module.scss";

export const Layout: FCC = ({ children }) => (
  <div className={classes.page}>
    <Header />
    <main className={classes.main}>{children}</main>
    <Footer className={classes.footer} />
  </div>
);
