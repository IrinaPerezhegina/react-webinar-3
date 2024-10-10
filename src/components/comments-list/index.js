import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsList({t = (data) => {}, list = [], count = 0, renderItem = (item) => {}}) {
  const cn = bem("Comments");

  return (
    <div className={cn()}>
       <span className={cn("title")}>{t("comments")} ({count})</span>
      <div className={cn("list")}>
      {list.map(item =>
        <div key={item._id}>
          {renderItem(item)}
        </div>)}
      </div>
    </div>
  )
 
}

CommentsList.propTypes = {
  t: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  count:PropTypes.number,
};

export default memo(CommentsList);
