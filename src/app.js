import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';
import ListСart from './components/list-сart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const [modal, setModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),
    onAddToCart: useCallback(
      (obj) => {
        store.addToCart(obj);
      },
      [store]
    ),
    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
    onDeleteItemFromCart: useCallback(
      (code) => {
        store.deleteItemCart(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
    <Head title="Магазин" />
    <Cart cart={cart} setVisible={setModal} />
    <List
      list={list}
      onAddToCart={callbacks.onAddToCart}
    />
    <Modal
      cart={cart}
      visible={modal}
      setVisible={setModal}
      onDeleteItemCart={callbacks.onDeleteItemFromCart}
    />
  </PageLayout>
  );
}

export default App;
