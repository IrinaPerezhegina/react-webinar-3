import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function UserCard({ userInfo = {}, t = text => text, }) {
  const cn = bem("UserCard");
  return (
    <div className={cn()}>
      <div className={cn("UserCard")}>
        <span>{t("profile")}</span>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("name")}:</div>
        <div className={cn("value")}>{userInfo?.name}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("phone")}:</div>
        <div className={cn("value")}>{userInfo?.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("email")}:</div>
        <div className={cn("value")}>{userInfo?.email}</div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  userInfo: PropTypes.object,
  t: PropTypes.func,
};

export default memo(UserCard);
