import { Navigate, Outlet } from "react-router";
import { userService } from "../services/user.service";

const { getUsers } = userService();

const ProtectedRoutes = () => {
  // const { data, isLoading, isError } = getUsers();
  const isTokenPresent = sessionStorage.getItem("token");

  // console.log(isError);
  if (!isTokenPresent) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
