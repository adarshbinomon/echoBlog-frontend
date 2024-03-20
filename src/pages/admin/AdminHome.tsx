import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { Link, Route, Routes } from "react-router-dom";
import UserManagement from "../../components/admin/UserManagement";
import AdminHomeComponent from "../../components/admin/AdminHomeComponent";

const AdminHome = () => {
  const navigate = useNavigate();

  const baseUrl: string = "http://localhost:4000/api/auth/admin";

  useEffect(() => {
    const adminToken = localStorage.getItem("adminAccessToken");
    if (adminToken) {
      navigate("/admin/");
    } else {
      navigate("/admin/login");
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div className="flex h-screen">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 bg-gray-100">
          <Navbar />
          <div className="w-full h-fullbg-red-200">
            <Routes>
              <Route path="/" element={<UserManagement />} />
              <Route
                path="/admin/user-management"
                element={<UserManagement />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
