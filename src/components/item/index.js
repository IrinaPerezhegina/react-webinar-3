import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function Item(props) {
  const {
     item,
     add,
     onAdd,
     onChangeLink,
  } = props
console.log(add);

  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => onAdd(item._id),
    onClick: (e) => onChangeLink(item._id),
  };
  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <span onClick={callbacks.onClick}>{item.title}</span>
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  add: PropTypes.string,
  link: PropTypes.string,
};

export default memo(Item);
