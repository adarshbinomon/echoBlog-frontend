import { useEffect } from "react";
import  { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import {  Route, Routes } from "react-router-dom";
import UserManagement from "../../components/admin/UserManagement";
import AdminHomeComponent from "../../components/admin/AdminHomeComponent";
import PostManagement from "../../components/admin/PostManagement";

const AdminHome = () => {
  const navigate = useNavigate();


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
              <Route path="/" element={<AdminHomeComponent />} />
              <Route
                path="/user-management"
                element={<UserManagement />}
              />
              <Route
                path="/post-management"
                element={<PostManagement />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
