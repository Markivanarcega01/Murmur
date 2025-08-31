import { Navigate, Outlet } from "react-router";
import { userService } from "../services/user.service";

const { getUsers } = userService();

const PublicRoutes = () => {
  // const { data, isLoading } = getUsers();
  const isTokenPresent = sessionStorage.getItem("token");

  if (isTokenPresent) {
    return <Navigate to={"/"} />;
  }
  // if (isLoading) {
  //   return "Loading";
  // }
  return <Outlet />;
};

export default PublicRoutes;
