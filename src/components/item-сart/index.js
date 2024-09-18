import React, { useState } from "react";
import PropTypes from "prop-types";
import { getTypeOfNumber, plural } from "../../utils";
import "./style.css";

function ItemCart(props) {
  // Счётчик выделений

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className={"ItemCart"}>
      <div className="ItemCart-code">{props.item.code}</div>
      <div className="ItemCart-title">{props.item.title} </div>

      <div className="ItemCart-price">
        {getTypeOfNumber(props.item.price)} ₽
      </div>
      <div className="ItemCart-count">{props.item.count} шт.</div>
      <div className="ItemCart-actions">
        <button onClick={callbacks.onClick}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
};

ItemCart.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(ItemCart);
