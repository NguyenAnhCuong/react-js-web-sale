import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPerrmitted";

const RoleRoute = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const role = user.role;

  if (isAdminRoute && role === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <>
      {isAuthenticated === true ? (
        <RoleRoute>{props.children}</RoleRoute>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
