import { memo, useCallback, useEffect } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Basket from "../basket";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import { useParams } from "react-router-dom";
import ProductCart from "../../components/product-cart";
import Language from "../../components/language";
import Navbar from "../../components/navbar";
import useTranslation from "../../i18n/useTranslation";

function Article() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    productById: state.catalog.productById,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.dictionary.lang,
  }));
  const { t }=useTranslation()
  const { id } = useParams();

  // получение данных об состоянии модального окна
  const activeModal = useSelector((state) => state.modals.name);

  // Загрузка данных о товаре по его ID
  useEffect(() => {
    store.actions.catalog.loadById(id);
  }, [id]);

  const callbacks = {
    // Добавление товара в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store, select.status]
    ),
    // Открытие любой модалки
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
  };

  return (
    <PageLayout
      head={<Head title={select.productById.title} />}
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
      <ProductCart
        producingСountry={t('producingСountry')}
        category={t('category')}
        yearOfRelease={t('yearOfRelease')}
        price={t('price')}
        add={t('add')}
        productById={select.productById}
        onAdd={callbacks.addToBasket}
      />
      {activeModal === "basket" && <Basket />}
      <Language onChange={callbacks.onChangeLang} lang={select.lang} />
    </PageLayout>
  );
}

export default memo(Article);
