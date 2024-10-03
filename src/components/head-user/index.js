import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

function HeadUser(props) {
  const cn = bem("HeadUser");

  return (
    <div className={cn()}>
      <div className={cn("profile")}>
        <Link to={"/profile"}>{props.name} </Link>
      </div>
      <div className={cn("controls")}>
        {props.auth ? (
          <button onClick={props.logout}>{props.t("exit")}</button>
        ) : (
          <Link to={props.link}> {props.t("entry")}</Link>
        )}
      </div>
    </div>
  );
}

HeadUser.propTypes = {
  t: PropTypes.func,
  link: PropTypes.string,
  auth: PropTypes.bool,
  logout: PropTypes.func,
};

export default memo(HeadUser);
