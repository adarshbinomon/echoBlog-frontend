import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MouseEventHandler, useEffect, useState } from "react";
import { UserData, PostData } from "../../utils/interfaces/inteface";
import { useSelector } from "react-redux";
import { dateParser } from "../../helper/dateParser";
import { timeParser } from "../../helper/timeParser";
import { Heart, MessageCircle, Bookmark, BookmarkCheck } from "lucide-react";
import { calculateReadTime } from "../../helper/wordCountToReadTime";
import { BookOpenText } from "lucide-react";
import toast from "react-hot-toast";
import { addUser } from "../../redux/slices/userSlices";
import { useDispatch } from "react-redux";

interface PostListProps {
  userId: string | undefined;
}

const PostList: React.FC<PostListProps> = ({ userId }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostData[]>([]);
  const postServiceBaseUrl: string = "http://localhost:4002/api/post";
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";
  const dispatch = useDispatch();

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  useEffect(() => {
    if (userId) {
      axios
        .get(`${postServiceBaseUrl}/get-posts/${userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setPosts(res.data.posts);
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          console.log(posts.length);
        });
    }
  }, [userId]);

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
    <div>
      {posts.length === 0 ? (
        <div className=" flex items-center">
          <p>No posts to show</p>
        </div>
      ) : (
        posts
          .slice()
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
                    <img src={post?.image[0]} alt="image" className="w-full" />
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
  );
};

export default PostList;
