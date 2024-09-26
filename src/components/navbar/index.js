import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import config from "../../config.json";

function NavBar({ link, onChange }) {
  const cn = bem("NavBar");
  const callbacks = {
    onChangePage: (e) => onChange(1),
  };
  return (
    <nav className={cn()} onClick={callbacks.onChangePage}>
      <Link to={config.url}>{link}</Link>
    </nav>
  );
}

NavBar.propTypes = {
  Link: PropTypes.string,
  onChange: PropTypes.func,
};

export default memo(NavBar);
