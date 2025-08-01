import { Navigate, Outlet } from "react-router";
import { userService } from "../services/user.service";

const { getUsers } = userService();

const PublicRoutes = () => {
  const { data, isLoading } = getUsers();

  if (data) {
    return <Navigate to={"/"} />;
  }
  if (isLoading) {
    return "Loading";
  }
  return <Outlet />;
};

export default PublicRoutes;
