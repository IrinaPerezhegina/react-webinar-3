import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import ProtectedRoutes from "../components/protected-routes";
import Profile from "./profile";
import PageLayout from "../components/page-layout";
import HeadUser from "../components/head-user";
import useTranslate from "../hooks/use-translate";
import { useCallback } from "react";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const select = useSelector((state) => ({
    auth: state.auth.auth,
    userName: state.auth.userName,
  }));
  const activeModal = useSelector((state) => state.modals.name);

  useInit(
    () => {
      store.actions.auth.loadUserAuth();
    },
    [],
    true
  );

  const callbacks = {
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <HeadUser
        t={t}
        logout={callbacks.logout}
        link={"/login"}
        auth={select.auth}
        name={select.userName}
      />
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route element={<ProtectedRoutes auth={true} link={"/login"} />}>
          <Route path={"/profile"} element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoutes auth={false} />}>
          <Route path={"/login"} element={<Login />} />
        </Route>
      </Routes>
      {activeModal === "basket" && <Basket />}
    </PageLayout>
  );
}

export default App;