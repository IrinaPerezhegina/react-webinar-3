import { Navigate, Outlet } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import PropTypes from "prop-types";

const ProtectedRoutes = (props) => {
  const select = useSelector((state) => ({
    auth: state.auth.auth,
  }));

  return select.auth === props.auth ? (
    <Outlet />
  ) : (
    <Navigate to={props.link ? props.link : "/profile"} />
  );
};
ProtectedRoutes.propTypes = {
  auth: PropTypes.bool,
};
export default ProtectedRoutes;
