import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlices";
import { Link, Route, Routes } from "react-router-dom";
import Following from "../../components/home/Following";
import ForYou from "../../components/home/ForYou";
import UserList from "../../components/home/UserList";
import Community from "../../components/home/Community";
import CommunityList from "../../components/home/CommunityList";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const id = userData._id;

  const authServiceBaseUrl: string = "http://localhost:4000/api/auth/user";
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";
  const postServiceBaseUrl: string = "http://localhost:4002/api/post";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
      axios
        .get(`${userServiceBaseUrl}/user-profile/${id}`)
        .then((res) => {
          dispatch(addUser(res.data.user));
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      {/* main div */}
      <div className="flex justify-center min-h-screen space-x-1 pt-[100px] ">
        {/* left div for posts */}
        <div className="ms-10 w-2/3 h-auto flex flex-col border-right-4 ">
          <div className="flex justify-between font-semibold px-10">
            <Link to="/">
              <span
                className={
                  location.pathname === "/"
                    ? "text-indigo-600 font-bold"
                    : "hover:text-indigo-600 hover:font-bold"
                }
              >
                For You
              </span>
            </Link>

            {/* <Link to="/following">
              <span
                className={
                  location.pathname === "/following"
                    ? "text-indigo-600 font-bold"
                    : "hover:text-indigo-600 hover:font-bold"
                }
              >
                Following
              </span>
            </Link> */}
            <Link to="/community">
              <span
                className={
                  location.pathname === "/community"
                    ? "text-indigo-600 font-bold"
                    : "hover:text-indigo-600 hover:font-bold"
                }
              >
                Community
              </span>
            </Link>

            {/* <span className="hover:text-indigo-600 hover:font-bold ">
              Topics You Follow
            </span>
            <span className="hover:text-indigo-600 hover:font-bold ">
              Explore Topics
            </span> */}
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
          <CommunityList/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
