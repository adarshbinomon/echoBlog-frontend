import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = useSelector((state: any) => state.persisted.user.userData);

  return user?._id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
