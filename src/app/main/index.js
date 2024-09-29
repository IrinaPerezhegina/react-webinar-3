import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Language from "../../components/language";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import useTranslation from "../../i18n/useTranslation";
import BetweenLayout from "../../components/between-layout";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    page: state.catalog.page,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.dictionary.lang,
  }));
  const navigate = useNavigate();

  // Получение целого данных всех страниц
  const totalPages = Math.ceil(select.count / select.limit);
  const { t }=useTranslation()


  // Загрузка данных для пагинации
  useEffect(() => {
    let skip = (select.page - 1) * select.limit;
    store.actions.catalog.loadListPagination(select.limit, skip);
  }, [select.page]);

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
   <>
      <Head title={t('shop')} />
      <BetweenLayout>
        <Navbar
            onChange={callbacks.onChangePage}
            link={t('main')}
        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          empty={t('empty')}
          pass={t('pass')}
          inCart={t('inCart')}
          lang={select.lang}
        />
      </BetweenLayout>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalPages={totalPages}
        page={select.page}
        changPage={callbacks.onChangePage}
      />
      <Language onChange={callbacks.onChangeLang} lang={select.lang} />
      </>
  );
}

export default memo(Main);
