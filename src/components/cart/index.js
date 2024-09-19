import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { getFullAmount, getTypeOfNumber, plural } from "../../utils";

function Cart({ cart, setVisible }) {
  return (
    <div className="Card">
      <div className="Card-content">
        <span>В корзине: </span>
        {cart.length !== 0 ? (
          <span>
            {cart.length}{" "}
            {`${plural(cart.length, {
              one: "товар",
              few: "товарa",
              many: "товаров",
            })}`}
            /{getTypeOfNumber(getFullAmount(cart))} ₽
          </span>
        ) : (
          <span>пусто</span>
        )}
      </div>
      <div className="Card-btn">
        <button onClick={() => setVisible(true)}>Перейти</button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default React.memo(Cart);
