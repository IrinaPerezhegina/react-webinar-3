import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import UserCard from "../../components/user-card";
import Spinner from "../../components/spinner";

/**
 * СТраница профиля
 */
function Profile() {
  const select = useSelector((state) => ({
    userInfo: state.auth.userInfo,
    waiting: state.auth.waiting,
  }));

  const { t } = useTranslate();

  return (
    <>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <UserCard userInfo={select.userInfo} t={t} />
      </Spinner>
    </>
  );
}

export default memo(Profile);
