import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import  { useNavigate } from "react-router-dom";
import axios from "axios";

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
  }, [navigate]);

  const handleLogout = () => {
    axios
      .get(`${baseUrl}/logout`, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem("adminAccessToken");
          navigate("/admin/login");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in logout");
      });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="sm:mx-auto  sm:w-full sm:max-w-sm border px-7 py-4 rounded-2xl bg-gray-100">
        <h6 className=" ml-10 ps-44 text-gray-500">admin</h6>
        <h2 className="mb-4 text-center text-4xl font-bold text-red-600 hover:text-red-500 ">
          {"<EchoBlog/>"}
        </h2>
        <button
          onClick={handleLogout}
          className="w-1/3 ms-24 mb-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
