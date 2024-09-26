import { memo } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

function ItemBasket(props) {
  const cn = bem("ItemBasket");
const {
  item,
  pcs,
  onRemove,
  onClose,
  link,
  del
} = props
  const callbacks = {
    onRemove: (e) => onRemove(item._id),
    onClick: (e) => onClose(),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link to={link} onClick={callbacks.onClick}>{item.title}</Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(item.amount || 0)} {pcs}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{del}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  psc: PropTypes.string,
  del: PropTypes.string,
  link: PropTypes.string,
};


export default memo(ItemBasket);
