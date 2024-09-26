import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function ProductCart(props) {
  const cn = bem("ProductCart");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.productById._id),
  };

  return (
    <div className={cn()}>
      <div>{props.productById.description}</div>
      <div>
        {props.producingСountry}:
        <span>
          {props.productById.madeTitle} ({props.productById.code})
        </span>
      </div>
      <div>
        {props.category}:<span>{props.productById.categoryTitle}</span>
      </div>
      <div>
        {props.yearOfRelease}:<span>{props.productById.edition}</span>
      </div>
      <div>
        <span> {props.price}: </span>
        <span>{props.productById.price} ₽</span>
      </div>
      <div>
        {" "}
        <button onClick={callbacks.onAdd}>{props.add}</button>
      </div>
    </div>
  );
}

ProductCart.propTypes = {
  productById: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    edition: PropTypes.number,
    formatPrice: PropTypes.string,
    madeTitle: PropTypes.string,
    code: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func,
  add: PropTypes.string,
  price: PropTypes.string,
  yearOfRelease: PropTypes.string,
  category: PropTypes.string,
  producingСountry: PropTypes.string,
};

export default memo(ProductCart);
