import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../../utils/interfaces/inteface";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { dateParser } from "../../helper/dateParser";
import { Link, Route, Routes } from "react-router-dom";
import { FileText, CalendarDays } from "lucide-react";
import PostList from "../../components/profile/PostList";

const ThirdProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<UserData>();
  
  
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";
  
  useEffect(() => {
      axios
      .get(`${userServiceBaseUrl}/user-profile/${userId}`)
      .then((res: any) => {
          setUser(res.data.user);
        });
    }, []);

    const createdOn = dateParser(user?.createdOn as unknown as Date);

  return (
    <>
      <div className="w-screen   relative ">
        <Navbar />
        <div className="p-16 flex items-center flex-col  ">
          <div className=" border border-gray-200 w-[700px] h-[200px] mt-8 overflow-hidden ">
            <img src={user?.coverPicture} alt="coverPicture" />
          </div>
          <div className="justify-start px-5  w-[700px] mt-[-75px]">
            <div className="border border-gray-200 w-[150px] h-[150px] rounded-full justify-center flex items-center overflow-hidden">
              <img
                className=""
                src={user?.profilePicture}
                alt="profile-picture"
              />
            </div>

            <div className="flex flex-col space-y-2 ms-[-20px]">
              <div
                id="name"
                className="flex container justify-start text-xl font-bold text-gray-900 w-auto mt-5 font"
              >
                <p>{user?.name}</p>
              </div>
              <div
                id="userName"
                className="flex justify-start mt-[5px] font-thin font-mono text-gray-500 w-[150px] "
              >
                <p>@{user?.userName}</p>
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
                  {user?.followers.length} Followers {user?.following.length}{" "}
                  Following
                </p>
              </div>
              <div className="flex flex-row  ">
                <Link to={`user/${user?._id}`}>
                  <span className="hover:text-indigo-600 hover:text-lg transform hover:scale-105 transition-transform transform-origin-top hover:cursor-pointer pe-10 hover:pe-9 ">
                    Blogs
                  </span>
                </Link>
                <Link to={"profile/community"}>
                  <span className="hover:text-indigo-600 hover:text-lg transform hover:scale-105 transition-transform transform-origin-top hover:cursor-pointer px-10 hover:pe-9">
                    Communities{" "}
                  </span>
                </Link>
              </div>
              <hr className="w-[700px] "></hr>
            </div>
          </div>
          <div className="">
            <Routes>
              <Route path="/" element={<PostList userId={user?._id} />}></Route>
              {/* <Route path="/community" element={<CommunityList />}></Route> */}
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThirdProfile;
