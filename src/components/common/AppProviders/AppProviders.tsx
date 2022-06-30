import { Store } from "@reduxjs/toolkit";
import { i18n } from "i18next";
import { I18nextProvider } from "react-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { FCC } from "~/types/react";

export interface AppProvidersProps {
  i18n: i18n;
  store: Store;
}

export const AppProviders: FCC<AppProvidersProps> = ({
  store,
  i18n,
  children
}) => (
  <ReduxProvider store={store}>
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  </ReduxProvider>
);
