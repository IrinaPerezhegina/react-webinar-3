import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import config from "../../config.json"
import useTranslation from '../../i18n/useTranslation';
 
function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const { t }=useTranslation()
  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };


  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket 
                  item={item} 
                  onRemove={callbacks.removeFromBasket} 
                  link={`${config.url}/${item._id}`} 
                  onClose={callbacks.closeModal}
                  pcs={t('pcs')}
                  del={t('delete')}
                />;
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={t('Basket')} onClose={callbacks.closeModal} close={t('close')}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum}  Total={t('Total')}/>
    </ModalLayout>
  );
}

export default memo(Basket);
