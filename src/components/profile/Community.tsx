import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CommunityData,
  PostData,
  UserData,
} from "../../utils/interfaces/inteface";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addUser } from "../../redux/slices/userSlices";
import { useDispatch } from "react-redux";
import { dateParser } from "../../helper/dateParser";
import { timeParser } from "../../helper/timeParser";
import {
  Heart,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  BookOpenText,
} from "lucide-react";
import { calculateReadTime } from "../../helper/wordCountToReadTime";
const postServiceBaseUrl = import.meta.env.VITE_POST_SERVICE_BASEURL;
const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;
const groupServiceBaseUrl = import.meta.env.VITE_GROUP_SERVICE_BASEURL;

const Community = () => {
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  const dispatch = useDispatch();

  const [communities, setCommunities] = useState<CommunityData>();
  const [posts, setPosts] = useState<PostData>();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${groupServiceBaseUrl}/get-user-communities/${userData?._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setCommunities(res.data.communities);
        });
    } catch (error) {
      console.log("error in finding communities:", error);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${postServiceBaseUrl}/get-user-community-post/${userData?._id}`)
      .then((res: any) => {
        setPosts(res.data.posts);
      })
      .catch(() => {
        toast.error("Error in finding Posts 😟");
      });
  }, []);

  const handlePost = (id: string) => {
    navigate(`/post/${id}`);
  };

  const handleSave = (postId: string) => {
    const data = {
      postId,
      userId: userData._id,
    };

    try {
      axios
        .put(`${userServiceBaseUrl}/save-post/`, data, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch(addUser(res.data.user));
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center mt-2 gap-4">
        {communities?.map((community: CommunityData) => (
          <Link key={community._id} to={`/community-profile/${community._id}`}>
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <img
                  src={community.profilePicture}
                  alt={community.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <h3 className="text-sm font-semibold">{community.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="ps-6">
        <p>Your Posts:</p>
      </div>
      <div>
        {posts?.length === 0 ? (
          <div className=" flex items-center">
            <p>No posts to show</p>
          </div>
        ) : (
          posts
            ?.slice()
            .reverse()
            .map((post: PostData, i: number) => (
              <div
                key={i}
                className="w-[700px] border p-10 text-center m-[20px] relative text-gray-600 bg-white rounded-md"
              >
                <div className="flex space-x-3 -ms-8 -mt-8">
                  <div className="w-12 border rounded-full overflow-hidden">
                    <img
                      src={post?.createdBy?.profilePicture}
                      alt="profilePicture"
                    />
                  </div>
                  <div className="flex flex-col text-start">
                    <p>{post.createdBy?.name}</p>
                    <p className="font-mono">@{post?.createdBy?.userName}</p>
                  </div>
                </div>
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => handlePost(post._id)}
                >
                  <div className="text-black font-medium  text-xl w-3/4 flex ">
                    <div className="w-3/4 p-8">
                      <p className="mt-2">{post.title}</p>
                    </div>
                  </div>
                  {post.image.length > 0 && (
                    <div className="w-1/4 border overflow-hidden">
                      <img
                        src={post?.image[0]}
                        alt="image"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 mb-2 ml-2 flex space-x-3 cursor-default">
                  <p>
                    {dateParser(post.createdOn)} - {timeParser(post.createdOn)}
                  </p>
                  <BookOpenText size={23} />
                  <p>{calculateReadTime(post.content)} min read</p>
                  <Heart size={23} />
                  <p>{post?.like?.length} Likes</p>
                  <MessageCircle size={23} />
                  <p>{post?.comment?.length} Comments</p>
                </div>
                <div className="absolute bottom-0 right-0 mr-2 mb-2 cursor-pointer">
                  {userData.savedPosts.includes(post._id) ? (
                    <BookmarkCheck
                      onClick={() => {
                        handleSave(post._id);
                      }}
                    />
                  ) : (
                    <Bookmark
                      onClick={() => {
                        handleSave(post._id);
                      }}
                    />
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default Community;
