import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { UserData } from "../../utils/interfaces/inteface";

const ProtectedRoutes = () => {
  const user = useSelector((state: UserData) => state.persisted.user.userData);

  return user?._id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
