import type { AppProps } from "next/app";
import {
  AppProviders,
  AppProvidersProps
} from "~/components/common/AppProviders/AppProviders";
import { Layout } from "~/components/common/Layout/Layout";
import { store } from "~/state/store";
import i18n from "~/translations/i18n";
import { FC } from "~/types/react";
import "~/styles/globals.scss";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const providersProps: AppProvidersProps = { store, i18n };
  return (
    <AppProviders {...providersProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  );
};

export default MyApp;
