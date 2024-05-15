import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserData, PostData } from "../../utils/interfaces/inteface";
import { timeParser } from "../../helper/timeParser";
import { dateParser } from "../../helper/dateParser";
import { calculateReadTime } from "../../helper/wordCountToReadTime";
import {
  BookOpenText,
  Heart,
  Bookmark,
  BookmarkCheck,
  MessageCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../redux/slices/userSlices";
import { useDispatch, useSelector } from "react-redux";

const Following = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const postServiceBaseUrl: string = "http://localhost:4002/api/post";
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(4);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  useEffect(() => {
    const following = userData.following;
    setLoading(true);
    axios
      .post(
        `${postServiceBaseUrl}/posts-from-following?offset=0`,
        { following },
        { withCredentials: true }
      )
      .then((res) => {
        setTimeout(() => {
          setPosts((prevItems) => [...prevItems, ...res.data.posts]);
          console.log("posts", res);
          setLoading(false);
          res.data.posts.length > 0 ? setHasMore(true) : setHasMore(false);
          setIndex((prevIndex) => prevIndex + 4);
        }, 500);
      })
      .catch((error) => {
        setError(true);
        console.error("Error fetching posts:", error);
      });
  }, [userData.following]);

  const fetchNextPage = () => {
    const following = userData.following;
    axios
      .post(
        `${postServiceBaseUrl}/posts-from-following?offset=${index}`,
        { following },
        { withCredentials: true }
      )
      .then((res) => {
        setTimeout(() => {
          setPosts((prevItems) => [...prevItems, ...res.data.posts]);
          res.data.posts.length > 0 ? setHasMore(true) : setHasMore(false);
          setIndex((prevIndex) => prevIndex + 4);
        }, 500);
      })
      .catch((error) => {
        setError(true);
        console.error("Error fetching posts:", error);
      });
  };

  const handlePost = (id: string) => {
    navigate(`/post/${id}`);
  };

  const handleSave = (postId: string) => {
    const data = {
      postId,
      userId: userData._id,
    };

    axios
      .put(`${userServiceBaseUrl}/save-post/`, data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(addUser(res.data.user));
      })
      .catch((error) => {
        console.log("Error saving post:", error);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-10">
          <span className="loading loading-bars loading-sm justify-center text-indigo-600"></span>
        </div>
      ) : (
        <div>
          {error && (
            <div className="flex justify-center mt-10 font-semibold text-gray-500">
              <h3>Seems like Post Service is Down 🤐☹️</h3>
            </div>
          )}
          {posts.length > 0 && (
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchNextPage}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center" key="loader">
                  <span className="loading loading-bars loading-sm justify-center text-indigo-600"></span>
                </div>
              }
              endMessage={
                <p
                  className="font-semibold text-gray-500"
                  style={{ textAlign: "center" }}
                >
                  You saw everything! 🫡
                </p>
              }
            >
              {posts.map((post: PostData) => (
                <div
                  key={post._id}
                  className="border p-10 text-center m-4 relative rounded-lg shadow-md text-gray-600 bg-white"
                >
                  <Link to={`/user/${post?.createdBy?._id}`}>
                    <div className="flex space-x-3 -ms-8 -mt-8">
                      <div className="w-12 border rounded-full overflow-hidden">
                        <img
                          src={post.createdBy?.profilePicture}
                          alt="profilePicture"
                        />
                      </div>
                      <div className="flex flex-col text-start">
                        <p>{post.createdBy?.name}</p>
                        <p className="font-mono">@{post.createdBy?.userName}</p>
                      </div>
                    </div>
                  </Link>
                  <div
                    className="flex justify-between cursor-pointer"
                    onMouseDown={() => handlePost(post._id)}
                  >
                    <div className="text-black font-medium text-xl w-3/4 flex">
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
                      {dateParser(post.createdOn)} -{" "}
                      {timeParser(post.createdOn)}
                    </p>
                    <BookOpenText size={23} />
                    <p>{calculateReadTime(post.content)} min read</p>
                    <Heart
                      fill={post.like.includes(userData._id) ? "" : "none"}
                      size={23}
                    />
                    <p>{post?.like?.length} Likes</p>
                    <MessageCircle size={23} />
                    <p>{post?.comment?.length} Comments</p>
                  </div>
                  <div className="absolute bottom-0 right-0 mr-2 mb-2 cursor-pointer">
                    {userData.savedPosts?.includes(post._id) ? (
                      <BookmarkCheck
                        onMouseDown={() => {
                          handleSave(post._id);
                        }}
                      />
                    ) : (
                      <Bookmark
                        onMouseDown={() => {
                          handleSave(post._id);
                        }}
                      />
                    )}{" "}
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          )}
        </div>
      )}
    </div>
  );
};

export default Following;
