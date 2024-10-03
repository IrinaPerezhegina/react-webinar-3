import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [data, setData] = useState({ login: "", password: "" });
  const cn = bem("LoginForm");

  // Обработчик изменений в поле
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      props.handleSubmit(data);
    },
  };

  return (
    <div className={cn()}>
      <span>{props.t("entry")}</span>
      <form className={cn("form")} onSubmit={callbacks.onSubmit}>
        <div>
          <label htmlFor={"login"}>{props.t("login")}</label>
          <input name="login" type="text" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor={"password"}>{props.t("password")}</label>
          <input name="password" type="password" onChange={handleChange} />
        </div>
        {props.error &&
          props.error.map((err, i) => {
            return (
              <div className={cn("error")} key={i}>
                {err}
              </div>
            );
          })}
        <button type="submit" onSubmit={callbacks.onSubmit}>
          {props.t("enter")}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

export default memo(LoginForm);
