import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearUser } from "../../redux/slices/userSlices";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import {
  CommunityData,
  PostData,
  UserData,
} from "../../utils/interfaces/inteface";
const authServiceBaseUrl = import.meta.env.VITE_AUTH_SERVICE_BASEURL;

const postServiceBaseUrl = import.meta.env.VITE_POST_SERVICE_BASEURL;
const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;
const groupServiceBaseUrl = import.meta.env.VITE_GROUP_SERVICE_BASEURL;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [userSuggestions, setUserSuggestions] = useState<UserData[]>([]);
  const [communitySuggestions, setCommunitySuggestions] = useState<
    CommunityData[]
  >([]);
  const [postSuggestions, setPostSuggestions] = useState<PostData[]>([]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    axios
      .get(`${userServiceBaseUrl}/search-user/${value}`)
      .then((res) => {
        const users = res.data.users;
        const suggestions = users.filter((user: { name: string }) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        );
        setUserSuggestions(suggestions);
      })
      .catch((error) => {
        console.error("Error searching users:", error);
      });
    axios
      .get(`${postServiceBaseUrl}/search-post/${value}`)
      .then((res) => {
        const posts = res.data.posts;
        const suggestions = posts.filter((post: { title: string }) =>
          post.title.toLowerCase().includes(value.toLowerCase())
        );
        setPostSuggestions(suggestions);
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });
    axios
      .get(`${groupServiceBaseUrl}/search-community/${value}`)
      .then((res) => {
        const communities = res.data.communities;
        const suggestions = communities.filter((community: { name: string }) =>
          community.name.toLowerCase().includes(value.toLowerCase())
        );
        setCommunitySuggestions(suggestions);
        console.log(suggestions);
      })
      .catch((error) => {
        console.error("Error searching communities:", error);
      });
  };

  const handleUserClick = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const handleCommunityClick = (communityId: string) => {
    navigate(`/community-profile/${communityId}`);
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
          <div className="w-2/3 relative">
            <input
              className="rounded-full p-2 w-full h-8"
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleInputChange}
            />
            {searchValue && (
              <div className="absolute z-10 bg-white w-full mt-1 border border-gray-300 rounded-md shadow-lg">
                {userSuggestions.length > 0 && (
                  <>
                    <p className="font-semibold ms-4">Users:</p>
                    {userSuggestions.map((user, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleUserClick(user._id)}
                      >
                        {user.name}
                      </div>
                    ))}
                  </>
                )}
                {postSuggestions.length > 0 && (
                  <>
                    <p className="font-semibold ms-4">Posts:</p>
                    {postSuggestions.map((post, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handlePostClick(post._id)}
                      >
                        {post.title}
                      </div>
                    ))}
                  </>
                )}
                {communitySuggestions.length > 0 && (
                  <>
                    <p className="font-semibold ms-4">Communities:</p>
                    {communitySuggestions.map((community, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleCommunityClick(community._id)}
                      >
                        {community.name}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <a href="/profile" className="text-white hover:text-gray-300">
              Profile
            </a>
            <Link to="/write-post" className="text-white hover:text-gray-300">
              Write
            </Link>
            <Link to="/chat" className="text-white hover:text-gray-300">
              Messages
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

export default Navbar;
