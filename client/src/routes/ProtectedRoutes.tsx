import { Navigate, Outlet } from "react-router";
import { userService } from "../services/user.service";

const { getUsers } = userService();

const ProtectedRoutes = () => {
  const { data, isLoading, isError } = getUsers();

  console.log(isError);
  if (isError) {
    return <Navigate to={"/login"} />;
  }
  if (isLoading) {
    return "Loading";
  }
  return <Outlet />;
};

export default ProtectedRoutes;
