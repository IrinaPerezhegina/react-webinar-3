import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Basket from "../basket";
import Pagination from "../../components/pagination";
import Language from "../../components/language";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import useTranslation from "../../i18n/useTranslation";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.dictionary.lang,
  }));
  const navigate = useNavigate();
  const limit = 10;
  // Получение целого данных всех страниц
  const totalPages = Math.ceil(select.count / limit);
  const { t }=useTranslation()


  // Загрузка данных для пагинации
  useEffect(() => {
    let skip = (select.page - 1) * limit;
    store.actions.catalog.loadListPagination(limit, skip);
  }, [select.page]);

  // Получение данных об состоянии модального окна
  const activeModal = useSelector((state) => state.modals.name);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    onChangeLang: useCallback(
      (lang) => store.actions.dictionary.removeStatus(lang),
      [store]
    ),
    onChangePage: useCallback(
      (p) => store.actions.catalog.onChangePage(p),
      [store]
    ),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onChangeLink: useCallback(
      (id) => {
        store.actions.modals.close();
        navigate(id, { replace: true });
      },
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            add={t('add')}
            item={item}
            onChangeLink={callbacks.onChangeLink}
            link={"_id"}
            onAdd={callbacks.addToBasket}
            closeModal={callbacks.closeModal}
          />
        );
      },
      [callbacks.addToBasket, select.lang]
    ),
  };

  return (
    <PageLayout
      head={<Head title={t('shop')} />}
      navbar={
        <Navbar
          onChange={callbacks.onChangePage}
          link={t('main')}
        />
      }
      basketTool={
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          empty={t('empty')}
          pass={t('pass')}
          inCart={t('inCart')}
          lang={select.lang}
        />
      }
    >
      <List list={select.list} renderItem={renders.item} />
      {activeModal === "basket" && <Basket />}
      <Pagination
        totalPages={totalPages}
        page={select.page}
        changPage={callbacks.onChangePage}
      />
      <Language onChange={callbacks.onChangeLang} lang={select.lang} />
    </PageLayout>
  );
}

export default memo(Main);
