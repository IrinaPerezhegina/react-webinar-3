import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import config from "../config.json"
import Main from "./main";
import Article from "./article";
import PageLayout from "../components/page-layout";
import useSelector from "../store/use-selector";
import Basket from "./basket";


function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <PageLayout>
      <Routes>
          <Route path={config.url} element={<Main />} />
          <Route path={`/${config.url}/:id`} element={<Article />} />
          <Route path={`/`} element={<Navigate to={config.url} />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </PageLayout>
  );
}

export default App;
