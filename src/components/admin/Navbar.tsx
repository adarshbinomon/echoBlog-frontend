import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const authServiceBaseUrl = import.meta.env.VITE_AUTH_SERVICE_BASEURL;



const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleLogout = () => {
    setLoading(true);
    axios
      .get(`${authServiceBaseUrl}/logout`, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem("adminAccessToken");
          navigate("/admin/login");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in logout");
      })
      .finally(() => setLoading(false));
  };

  return (
    <nav className="bg-gray-800 py-4 ">
      <div className="max-w-8xl  px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/admin" className="text-white font-bold text-xl">
          </Link>
        </div>
        <div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
