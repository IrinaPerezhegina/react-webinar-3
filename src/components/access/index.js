import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

function Access({t = (data) => {}, onCancel = () => {}, comment={}}) {

  const callbacks = {
    onClose: (e) => {
      e.preventDefault();
      onCancel();
    },
  };
  
  return (
    <div className="Access">
      <div>
        <Link to={"/login"}>{t("log")}</Link>
        {comment._type !== "comment" ? (
          <span>, {t("able")}</span>
        ) : (
          <>
            <span>, {t("respond")}</span>
            <button onClick={callbacks.onClose}>{t("cancel")}</button>
          </>
        )}
      </div>
    </div>
  );
}

Access.propTypes = {
  t: PropTypes.func,
  onCancel: PropTypes.func,
  comment: PropTypes.object,
};

export default memo(Access);
