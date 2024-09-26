import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Language({ onChange=() => {}, lang="ru" }) {
  const cn = bem("Language");

  return (
    <div className={cn()}>
      <button
        className={lang === "ru" ? cn("active") : cn(" ")}
        onClick={() => onChange("ru")}
      >
        RU
      </button>
      <button
        className={lang === "en" ? cn("active") : cn(" ")}
        onClick={() => onChange("en")}
      >
        EN
      </button>
    </div>
  );
}

Language.propTypes = {
  onChange: PropTypes.func.isRequired,
  lang: PropTypes.string,
};

export default memo(Language);
