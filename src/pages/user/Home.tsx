import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { useDispatch } from "react-redux";
import { addUser, clearUser } from "../../redux/slices/userSlices";
import { Link, Route, Routes } from "react-router-dom";
import Following from "../../components/home/Following";
import ForYou from "../../components/home/ForYou";
import UserList from "../../components/home/UserList";
import CommunityList from "../../components/home/CommunityList";
import Community from "../../components/home/Community";
const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;


const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const id = userData._id;


  useEffect(() => {
    axios
      .get(`${userServiceBaseUrl}/user-profile/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status) {
          console.log('if res.status');
          
          dispatch(addUser(res.data.user));
        } else if (
          !res.status &&
          res?.message === "Unauthorized - No token Provided"
        ) {
          dispatch(clearUser());
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error.response.status);

        if (error.response.status == 401) {
          dispatch(clearUser());
          navigate("/login");
        } else {
          console.log(error.response.data.message);
        }
      });
  }, [navigate,dispatch,id]);

  return (
    <>
      <Navbar />
      <div className="max-w-screen">
        <img
          className="block w-full h-full object-cover rounded"
          src="https://echoblog-images.s3.ap-south-1.amazonaws.com/1713437115921_coverPicture_Unleash%20your%20Creativity%20%282%29.png "
          alt=""
        />
      </div>

      {/* main div */}
      <div className="flex justify-center min-h-screen space-x-1 pt-5 ">
        {/* left div for posts */}
        <div className="ms-10 w-2/3 h-auto flex flex-col border-right-4 ">
          <div className="tabs tabs-bordered flex justify-between font-semibold px-10">
            <Link
              to="/"
              className={`tab ${
                location.pathname === "/" ? "tab-active font-bold text-indigo-600" : ""
              }`}
            >
              <span>For You</span>
            </Link>

            <Link
              to="/following"
              className={`tab ${
                location.pathname === "/following" ? "tab-active font-bold text-indigo-600" : ""
              }`}
            >
              <span>Following</span>
            </Link>

            <Link
              to="/community"
              className={`tab ${
                location.pathname === "/community" ? "tab-active font-bold text-indigo-600" : ""
              }`}
            >
              <span>Community</span>
            </Link>
          </div>
          {/* <hr /> */}
          <div className="h-full ">
            <Routes>
              <Route path="/" element={<ForYou />} />
              <Route path="/following" element={<Following />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </div>
        </div>
        {/* right sidebar */}
        <div className="w-1/4 ">
          <UserList />
          <CommunityList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
