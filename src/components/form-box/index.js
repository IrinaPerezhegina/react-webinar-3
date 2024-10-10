import { memo, useState,useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import Textarea from "../textarea";

function FormComponent(props) {
  const {
    t = (data) => {},
    comment = {},
    user = {},
    onSubmit = (data) => {},
    onCancel = () => {},
  } = props

  const cn = bem("FormComponent");
  const [value, setValue] = useState(t(`text`))

  const callbacks = {
    onCancel: (e) => {
      e.preventDefault();
      setValue(t(`text`));
      onCancel();
    },
    onSubmit: (e) => {
      e.preventDefault();
      onSubmit({
        text: value,
        parent: comment._type === "article" ? {_id : comment._id, _type:"article" }: comment.parent,
        profile: { _id: user._id, name: user.profile.name },
      });
    },
  }

  useEffect(()=>{
    if (comment.name && comment._type==="comment") {
      setValue(`${t("myanswer")} ${comment.name}`)
  } else setValue(t(`text`))
  },[comment.name])

  return (
    <form  
        className={cn()} 
        onSubmit={callbacks.onSubmit}
        >
        <Textarea
          t={t}
          value={value}
          setValue={setValue}
        />
        <div className={cn("btn")}>
          <button 
            type={"submit"} 
            disabled={!value.replace(/\s/g, "")}
            >
              {t("send")}
          </button>
        {comment._type === "comment" && (
          <button onClick = {callbacks.onCancel}>
            {t("cancel")}
          </button>
        )}
      </div>
    </form>
  );
}

FormComponent.propTypes = {
  t: PropTypes.func,
  authorName: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _type: PropTypes.string,
    parent: PropTypes.object,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    profile: PropTypes.object,
  }).isRequired,
};

export default memo(FormComponent);
