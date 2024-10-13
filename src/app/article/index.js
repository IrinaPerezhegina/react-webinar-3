import { memo, useCallback} from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import commentActions from "../../store-redux/comment/actions";
import { useSelector as useSelectorRedux } from "react-redux";
import CommentBox from "../../containers/comment-box";

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { lang, t } = useTranslate();

  const selectRedux = useSelectorRedux(
    (state) => ({
      data: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowequal
  );

  useInit(async () => {
    await Promise.all([
      dispatch(articleActions.load(id)),
      dispatch(commentActions.load(id)),
    ]);
  }, [id, lang]);

   const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };


return (
    <PageLayout>
      <TopHead />
      <Head title={selectRedux.data.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={selectRedux.waiting}>
        <ArticleCard
          article={selectRedux.data}
          onAdd={callbacks.addToBasket}
          t={t}
          lang={lang}
        />
      </Spinner>
      <CommentBox/>
    </PageLayout>
  );
}

export default memo(Article);
