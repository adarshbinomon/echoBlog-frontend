import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearUser } from "../../redux/slices/userSlices";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const navbar = () => {
  const authServiceBaseUrl: string = "http://localhost:4000/api/auth/user";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    axios
      .get(`${authServiceBaseUrl}/logout`, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem("accessToken");
          dispatch(clearUser());
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in logout");
      });
  };

  
  return (
    <nav className="bg-indigo-600 p-4 fixed w-full z-50">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-2xl hover:text-gray-300">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <div className="w-2/3">
            <input
              className="rounded-full p-2 w-2/4 h-8 float-right"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex space-x-4">
            <a href="/profile" className="text-white hover:text-gray-300">
              Profile
            </a>
            <Link to="/write-post" className="text-white hover:text-gray-300">
              <a>Write</a>
            </Link>
            <a href="#" className="text-white hover:text-gray-300">
              About
            </a>
            <a
              onClick={handleLogout}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
