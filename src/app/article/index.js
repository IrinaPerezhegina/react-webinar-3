import { memo, useCallback, useEffect } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import { useParams } from "react-router-dom";
import ProductCart from "../../components/product-cart";
import Language from "../../components/language";
import Navbar from "../../components/navbar";
import useTranslation from "../../i18n/useTranslation";
import BetweenLayout from "../../components/between-layout";

function Article() {
  const store = useStore();

  const select = useSelector((state) => ({
    list:state.catalog.list,
    data: state.article.data,
    productById: state.catalog.productById,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.dictionary.lang,
  }));
  const { t }=useTranslation()
  const { id } = useParams();

 // Загрузка данных о товаре по его ID
useEffect(() => {
  if (select.list.length===0) {
    store.actions.catalog.loadById(id);
  }
}, [id, select.list]);


  // Загрузка данных о товаре по его ID
  useEffect(() => {
    store.actions.article.loadById(id);
  }, [id]);

  const callbacks = {
    // Добавление товара в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
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
  <>
    <Head title={select.data.title} />
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
      <ProductCart
        producingСountry={t('producingСountry')}
        category={t('category')}
        yearOfRelease={t('yearOfRelease')}
        price={t('price')}
        add={t('add')}
        productById={select.data}
        onAdd={callbacks.addToBasket}
      />
      <Language onChange={callbacks.onChangeLang} lang={select.lang} />
      </>
  );
}

export default memo(Article);
