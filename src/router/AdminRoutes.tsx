import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/AdminHome";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<AdminHome />} />
    </Routes>
  );
};

export default AdminRoutes;
