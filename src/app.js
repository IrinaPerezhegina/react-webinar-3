import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import ModalHead from './components/modal-head';
import ModalResult from './components/modal-result';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const { fullAmount, amountOfProducts } = store.date;
  const [modal, setModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
    onAddToCart: useCallback(
      (obj) => {
        store.addToCart(obj);
      },
      [store]
    ),
    onDeleteItemFromCart: useCallback(
      (code) => {
        store.deleteItemCart(code);
      },
      [store]
    ),
  };

  return (
    <>
    <PageLayout>
    <Head title="Магазин" />
    <Cart cart={cart} setVisible={setModal} />
    <List
      list={list}
      onDeleteItem={callbacks.onDeleteItem}
      onAddToCart={callbacks.onAddToCart}
    /> 
  </PageLayout>
  <ModalLayout visible={modal}>
    <ModalHead title={"Корзина"} setVisible={setModal} />
    <List cart={cart} onDeleteItem={callbacks.onDeleteItemFromCart} />
    <ModalResult
      fullAmount={fullAmount}
      amountOfProducts={amountOfProducts}
    />
  </ModalLayout>
</>
  );
}

export default App;
