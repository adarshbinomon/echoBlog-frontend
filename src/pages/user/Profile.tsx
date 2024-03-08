import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { FileText, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dateParser } from "../../helper/dateParser";
import QuillViewer from "../../components/QuillViewer";
import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  content: string;
  _id: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  const [posts, setPosts] = useState<Post[]>([]);

  const postServiceBaseUrl: string = "http://localhost:4002/api/post";

  const createdOn = dateParser(userData.createdOn);

  //edit profile on click

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  useEffect(() => {
    axios
      .get(`${postServiceBaseUrl}/get-posts/${userData._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPosts(res.data.posts);
        console.log(posts);
        //  console.log(posts.length)
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        console.log(posts.length);
      });
  }, [userData._id]);

  const handlePost = (id: string) => {
    // navigate("/post");
    console.log(id);
    navigate(`/post/${id}` )
  };

  return (
    <>
      <div className="w-screen   relative ">
        <Navbar />
        <div className="p-16 flex items-center flex-col  ">
          <div className=" border border-gray-200 w-[700px] h-[200px] mt-8 overflow-hidden ">
            <img src={userData.coverPicture} alt="coverPicture" />
          </div>
          <div className="justify-start px-5  w-[700px] mt-[-75px]">
            <div className="border border-gray-200 w-[150px] h-[150px] rounded-full justify-center flex items-center overflow-hidden">
              <img
                className=""
                src={userData.profilePicture}
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
                <p>0 Blogs</p>
              </div>

              <div className=" flex space-x-2 text-gray-500">
                <CalendarDays size={20} color="gray" />
                <p>Joined on {createdOn}</p>
              </div>

              <div className=" flex space-x-2 text-gray-500">
                <p>
                  {userData?.followers.length} Followers{" "}
                  {userData?.following.length} Following
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
          <div>
            {posts.length &&
              posts.map((post: Post, i: number) => (
                <div
                  key={i}
                  className="w-[700px] border m-5 text-center font-semibold "
                  onClick={() => handlePost(post?._id)}
                >
                  {/* <QuillViewer content={post.content} /> */}
                  <p className="mt-2">{post.content.slice(30, 91)}...</p>
                  <br />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
