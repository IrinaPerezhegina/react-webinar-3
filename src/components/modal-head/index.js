import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function ModalHead({ title, setVisible }) {
  return (
    <div className="ModalHead">
      <h1>{title}</h1>
      <button onClick={() => setVisible(false)}>Закрыть</button>
    </div>
  );
}

ModalHead.propTypes = {
  title: PropTypes.node,
  setVisible: PropTypes.func.isRequired,
};

export default React.memo(ModalHead);
