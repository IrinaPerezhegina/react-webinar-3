import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import ItemCart from "../item-сart";
import { getTypeOfNumber, getFullAmount } from "../../utils";

function ListCart({ cart, onDeleteItem = () => {} }) {
  return (
    <div className="ListCart">
      {cart.length ? (
        cart.map((item) => (
          <div key={item.code} className="ListCart-item">
            <ItemCart item={item} onDelete={onDeleteItem} />
          </div>
        ))
      ) : (
        <div className="ListCart-empty">Корзина пустая...</div>
      )}
      <div className="ListCart-result">
        <span>Итого</span>
        <span>{getTypeOfNumber(getFullAmount(cart))} ₽</span>
      </div>
    </div>
  );
}

ListCart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
};



export default React.memo(ListCart);
