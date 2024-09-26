import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { getArray } from "../../utils";

function Pagination({ totalPages, page, changPage }) {
  const cn = bem("Pagination");
  const [array, setArray] = useState([]);

  // Получение массива при изменении номера страницы
  useEffect(() => {
    setArray(getArray(totalPages, page));
  }, [page, totalPages]);

  return (
    <div className={cn()}>
      {array.map((p, i) => {
        if (p === "...") {
          return (
            <span className={cn("points")} key={i}>
              {p}
            </span>
          );
        }
        return (
          <span
            onClick={() => changPage(p)}
            className={page === p ? cn("active") : cn("page")}
            key={i}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  changPage: PropTypes.func.isRequired,
};

export default memo(Pagination);
