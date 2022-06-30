import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { Home } from "~/components/Home/Home";
import { tkCommon } from "~/translations/i18n";
import { FC } from "~/types/react";

const tk = tkCommon;

const HomeScreen: FC = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <NextSeo title={t(tk.title)} description={t(tk.description)} />
      <Home />
    </Fragment>
  );
};

export default HomeScreen;
