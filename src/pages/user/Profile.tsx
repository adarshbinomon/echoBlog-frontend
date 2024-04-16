import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { FileText, CalendarDays, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dateParser } from "../../helper/dateParser";
import { Link, Route, Routes } from "react-router-dom";
import PostList from "../../components/profile/PostList";
import Community from "../../components/profile/Community";
// import SavedPosts from "../../components/profile/SavedPosts";
const Profile = () => {
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const navigate = useNavigate();

  const createdOn = dateParser(userData.createdOn);

  //edit profile on click

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <div className="w-screen   relative ">
        <Navbar />
        <div className="p-16 flex items-center flex-col">
          <div className=" border border-gray-200 w-[700px] h-[200px] mt-8 overflow-hidden ">
            <Link to={userData.coverPicture}>
              <img src={userData.coverPicture} alt="coverPicture" />
            </Link>
          </div>
          <div className="justify-start px-5  w-[700px] mt-[-75px]">
            <div className="border border-gray-200 w-[150px] h-[150px] rounded-full justify-center flex items-center overflow-hidden">
              <Link to={userData.profilePicture}>
                <img
                  className=""
                  src={userData.profilePicture}
                  alt="profile-picture"
                />
              </Link>
            </div>
            <div className="flex justify-end mt-[-70px] me-[-30px]">
              <button
                type="button"
                onClick={handleEditProfile}
                className={`flex space-x-1 items-center text-indigo-700 hover:text-white border border-indigo-700 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 transition duration-300 ease-in-out bg-white  dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 hover:bg-indigo-700`}
              >
                <Settings className="w-5 h-5 mx-1" />
                <span className="font-semibold">Settings</span>
              </button>
              <button
                type="button"
                className={`flex space-x-1 items-center text-indigo-700 hover:text-white border border-indigo-700 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 transition duration-300 ease-in-out bg-white  dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 hover:bg-indigo-700`}
              >
                ...
              </button>
            </div>
            <div className="flex flex-col space-y-2 ms-[-20px]">
              <div
                id="name"
                className="flex container justify-start text-xl font-bold text-gray-900 w-auto mt-5 font"
              >
                <p>{userData?.name}</p>
              </div>
              <div
                id="userName"
                className="flex justify-start mt-[5px] font-thin font-mono text-gray-500 w-[150px] "
              >
                <p>@{userData?.userName}</p>
              </div>

              <div className=" flex space-x-2 text-gray-500">
                <FileText size={20} color="gray" />
                <p>{userData.bio}</p>
              </div>

              <div className=" flex space-x-2 text-gray-500">
                <CalendarDays size={20} color="gray" />
                <p>Joined on {createdOn}</p>
              </div>

              <div className=" flex space-x-2 text-gray-500">
                <p>
                  {userData?.followers?.length} Followers{" "}
                  {userData?.following?.length} Following
                </p>
              </div>
              <div className="flex flex-row  ">
                <Link to={"/profile/"}>
                  <span className="hover:text-indigo-600 hover:text-lg transform hover:scale-105 transition-transform transform-origin-top hover:cursor-pointer pe-10 hover:pe-9 ">
                    Blogs
                  </span>
                </Link>
                <Link to={"/profile/community"}>
                  <span className="hover:text-indigo-600 hover:text-lg transform hover:scale-105 transition-transform transform-origin-top hover:cursor-pointer px-10 hover:pe-9">
                    Communities{" "}
                  </span>
                </Link>
                <Link to={"/profile/saved"}>
                  <span className="hover:text-indigo-600 hover:text-lg transform hover:scale-105 transition-transform transform-origin-top hover:cursor-pointer px-10 hover:pe-9">
                    Saved{" "}
                  </span>
                </Link>
              </div>
              <hr className="w-[700px] "></hr>
            </div>
          </div>
          <div className="">
            <Routes>
              <Route path="/" element={<PostList userId={userData?._id} />} />
              <Route path="/community" element={<Community />}></Route>
              {/* <Route path="/saved" element={<SavedPosts/>}></Route> */}
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
