import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { getTypeOfNumber } from "../../utils";

function ModalResult({ fullAmount, amountOfProducts }) {
  return amountOfProducts ? (
    <div className="ModalResult-price">
      <span>Итого</span>
      <span>{getTypeOfNumber(fullAmount)} ₽</span>
    </div>
  ) : (
    <div className="ModalResult-empty">Корзина пустая...</div>
  );
}

ModalResult.propTypes = {
  amountOfProducts: PropTypes.number.isRequired,
  fullAmount: PropTypes.number.isRequired,
};

export default React.memo(ModalResult);
