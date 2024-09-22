import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";
import ItemCart from "../item-сart";

function List({ list, cart, onDeleteItem= () => {}, onSelectItem=() => {}, onAddToCart= () => {}, }) {
  const date = list ? list : cart;
  return (
    <div className="List">
      {date.map((item) => (
        <div key={item.code} className="List-item">
          {list ? (
            <Item
              item={item}
              onAddToCart={onAddToCart}
              onDelete={onDeleteItem}
              onSelect={onSelectItem}
            />
          ) : (
            <ItemCart item={item} onDelete={onDeleteItem} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  onAddToCart: PropTypes.func,
};



export default React.memo(List);
