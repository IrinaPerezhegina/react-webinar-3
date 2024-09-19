import React, { useState } from "react";
import PropTypes from "prop-types";
import { getTypeOfNumber, plural } from "../../utils";
import "./style.css";

function Item(props) {
  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.item);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title} </div>
      <div className="Item-price">{getTypeOfNumber(props.item.price)} ₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
};

export default React.memo(Item);
