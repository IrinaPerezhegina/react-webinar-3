import { memo, useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import useSelector from "../../hooks/use-selector";
import { useLocation } from "react-router-dom";
/**
 * Главная страница - первичная загрузка каталога
 */
function Login() {
  const { pathname } = useLocation();
  const store = useStore();
  const select = useSelector((state) => ({
    error: state.auth.errorMessage,
  }));

  useEffect(() => {
    store.actions.auth.resetErrors();
  }, [pathname]);

  const callbacks = {
    handleSubmit: useCallback(
      (data) => store.actions.auth.login(data),
      [store]
    ),
  };

  const { t } = useTranslate();

  return (
    <>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        t={t}
        error={select.error}
        handleSubmit={callbacks.handleSubmit}
      />
    </>
  );
}

export default memo(Login);
