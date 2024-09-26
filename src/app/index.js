import { Navigate, Route, Routes } from "react-router-dom";
import config from "../config.json"
import Main from "./main";
import Article from "./article";

function App() {

  return (
    <Routes>
        <Route path={config.url} element={<Main />} />
        <Route path={`/${config.url}/:id`} element={<Article />} />
        <Route path={`/`} element={<Navigate to={config.url} />} />
    </Routes>
  );
}

export default App;
