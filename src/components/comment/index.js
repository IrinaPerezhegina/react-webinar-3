import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Access from "../access";
import FormComponent from "../form-box";

const Comment=React.forwardRef((props,ref)=> {
  const {
    t = (data) => {},
    isComment = false,
    auth = false,
    comment = {},
    data = 0,
    exist = false,
    onAnswer = (data) => {},
    margin = "0px",
  } = props

const cn = bem("Comment");

const content = isComment ? (
  <>
  <div className={cn("info")}>
    <span
        className={auth ? cn("auth") : cn("info")}
  >
        {comment?.author?.profile.name}
    </span>
    <span>{data}</span>
  </div>
  <div className={cn("text")}>
        {comment.text}
  </div>
  <span 
    className={cn("link")} 
    onClick={()=>onAnswer({ _id: "100", name: comment?.author?.profile.name, parent:{_type:"comment", _id: comment._id}})}
    >
      {t("answer")}
  </span>
</>
) : ( 
    <div ref={ref}> 
      {exist ? <FormComponent {...props} /> : <Access {...props} />}
    </div>    
)

  return (
    <div
      className={cn()}
      style={{
        paddingLeft: margin,
        marginTop: "10px",
      }}
    >
       {content}
    </div>
  );
})

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    author: PropTypes.object,
  }).isRequired,
  exist: PropTypes.bool,
  isComment: PropTypes.bool,
  onAnswer: PropTypes.func,
  margin: PropTypes.string,
  t: PropTypes.func,
};

export default memo(Comment);
