import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlices";
import { addUser } from "../../redux/slices/userSlices";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  console.log(userData);
  const id = userData._id;

  const authServiceBaseUrl: string = "http://localhost:4000/api/auth/user";
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
      axios
        .get(`${userServiceBaseUrl}/user-profile/${id}`)
        .then((res) => {
          console.log(res.data.user);
          dispatch(addUser(res.data.user));
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

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
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <Toaster position="top-right" reverseOrder={false}></Toaster>
        <div className="items-center sm:mx-auto sm:w-full sm:max-w-sm border px-7 rounded-2xl bg-white">
          <h2 className="mt-5 mb-5 text-center text-4xl font-bold text-indigo-600 hover:text-indigo-500">
            {"<EchoBlog/>"}
          </h2>

          <button
            onClick={handleLogout}
            className="w-1/3 ms-24 mb-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
