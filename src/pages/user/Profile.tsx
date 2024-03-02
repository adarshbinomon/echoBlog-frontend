import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const baseUrl = "http://localhost:4001/api/user";
  const navigate = useNavigate()
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const [userDetails, setUserDetails] = useState<UserData>();

  useEffect(() => {
    const id = userData._id;
    axios
      .get(`${baseUrl}/user-profile/${id}`)
      .then((res) => {
        console.log(res.data.user);
        setUserDetails(res.data.user);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  //date convertion for joining date

  const inputDate: string | undefined = userDetails?.createdOn;

  if (!inputDate) {
    return <div>No date available</div>;
  }

  const parsedDate = new Date(inputDate as string);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const createdOn = parsedDate.toLocaleDateString("en-US", options);

  //edit profile on click

  const handleEditProfile = () =>{
    navigate("/edit-profile")
  }

  return (
    <>
      <div className="w-screen h-screen bg-white">
        <Navbar />
        <div className="p-16 flex h-screen items-center flex-col  ">
          <div className=" border border-gray-200 w-[700px] h-[200px] mt-8 overflow-hidden ">
            <img src="9ae8fc22197c56c5e5b0c2c22b05186e .jpeg" alt="coverPicture" />
          </div>
          <div className="justify-start px-5  w-[700px] mt-[-75px]">
            <div className="border border-gray-200 w-[150px] h-[150px] rounded-full justify-center flex items-center overflow-hidden">
              <img
                className=""
                src="/dummy-profile.png"
                alt="profile-picture"
              />
            </div>
            <div className="flex justify-end mt-[-70px] me-[-30px]">
              <button
                type="button"
                onClick={handleEditProfile}
                className=" text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 "
              >
                Edit Profile
              </button>
              <button
                type="button"
                className=" text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 "
              >
                ...
              </button>
            </div>
            <div className="flex flex-col space-y-2 ms-[-20px]">
              <div
                id="name"
                className="flex justify-start text-xl font-bold text-gray-900 w-[150px] mt-5 font"
              >
                <p>{userDetails?.name}</p>
              </div>
              <div
                id="name"
                className="flex justify-start mt-[5px] font-thin font-mono text-gray-500 w-[150px] "
              >
                <p>@{userDetails?.userName}</p>
              </div>

              <div className=" flex space-x-2 text-gray-500">
                <FileText size={20} color="gray" />
                <p>0 Blogs</p>
              </div>

              <div className=" flex space-x-2 text-gray-500">
                <CalendarDays size={20} color="gray" />
                <p>Joined on {createdOn}</p>
              </div>

              <div className=" flex space-x-2 text-gray-500">
                <p>
                  {userDetails?.followers.length} Followers{" "}
                  {userDetails?.following.length} Following
                </p>
              </div>
              <div className="flex flex-row  ">
                <span className="hover:text-indigo-600 hover:text-lg transform hover:scale-105 transition-transform transform-origin-top hover:cursor-pointer pe-10 hover:pe-9 ">
                  Blogs
                </span>
                <span className="hover:text-indigo-600 hover:text-lg transform hover:scale-105 transition-transform transform-origin-top hover:cursor-pointer px-10 hover:pe-9">
                  Communities{" "}
                </span>
              </div>
              <hr className="w-[700px] "></hr>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
