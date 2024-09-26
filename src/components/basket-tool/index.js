import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool(props) {
 const {
  empty,
  pass,
  inCart,
  sum = 0,
  amount = 0,
  lang,
  onOpen=() => {} 
 }=props
 
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{inCart}:</span>
      <span className={cn('total')}>
        {lang ==="ru" ? amount
          ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
          : `${empty}`:amount
          ? `${amount} ${plural(amount, {
              one: 'product',
              few: 'products',
              many: 'products',
            })} / ${numberFormat(sum)} ₽`
          : `${empty}`
          }
      </span>
      <button onClick={onOpen}>{pass}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang:PropTypes.string,
};


export default memo(BasketTool);
