import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function ModalLayout({ visible, children }) {
  const cn = bem("Modal");

  return (
    <div className={visible ? cn() + " active" : cn()}>
      <div className={cn("content")} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default React.memo(ModalLayout);
