import { useEffect, useState } from "react";
import axios from "axios";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MdOutlineVerified } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

const postServiceBaseUrl = import.meta.env.VITE_POST_SERVICE_BASEURL;
const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;

const ForYou = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
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
    setLoading(true);
    axios
      .get(`${postServiceBaseUrl}/posts?offset=0`, {
        withCredentials: true,
      })
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        console.error("Error fetching posts:", error);
      });
  }, []);

  const fetchNextPage = () => {
    axios
      .get(`${postServiceBaseUrl}/posts?offset=${index}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPosts((prevItems) => [...prevItems, ...res.data.posts]);
        res.data.posts.length > 0 ? setHasMore(true) : setHasMore(false);
        setIndex((prevIndex) => prevIndex + 4);
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
      {loading ? (
        <div className="flex justify-center mt-10 ">
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
                <div className="flex justify-center">
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
                        {post.createdBy?.isPremium ? (
                          <MdOutlineVerified className="ms-2.5 mt-1.5" />
                        ) : (
                          ""
                        )}
                        <p className="font-mono">@{post.createdBy?.userName}</p>
                      </div>
                    </div>
                  </Link>
                  <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => handlePost(post._id)}
                  >
                    <div className="text-black font-medium text-xl w-3/4 flex ">
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

export default ForYou;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { UserData, PostData } from "../../utils/interfaces/inteface";
// import { timeParser } from "../../helper/timeParser";
// import { dateParser } from "../../helper/dateParser";
// import { calculateReadTime } from "../../helper/wordCountToReadTime";
// import {
//   BookOpenText,
//   Heart,
//   Bookmark,
//   BookmarkCheck,
//   MessageCircle,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { addUser } from "../../redux/slices/userSlices";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { MdOutlineVerified } from "react-icons/md";
// const postServiceBaseUrl = import.meta.env.VITE_POST_SERVICE_BASEURL;
// const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;

// const ForYou = () => {
//   const [posts, setPosts] = useState<PostData[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<boolean>(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userData = useSelector(
//     (state: UserData) => state.persisted.user.userData
//   );

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${postServiceBaseUrl}/posts`, { withCredentials: true })
//       .then((res) => {
//         setPosts(res.data.posts);
//         setTimeout(() => {
//           setLoading(false);
//         }, 500);
//       })
//       .catch((error) => {
//         setError(true);
//         console.error("Error fetching posts:", error);
//       });
//   }, []);

//   const handlePost = (id: string) => {
//     navigate(`/post/${id}`);
//   };

//   const handleSave = (postId: string) => {
//     const data = {
//       postId,
//       userId: userData._id,
//     };

//     try {
//       axios
//         .put(`${userServiceBaseUrl}/save-post/`, data, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           dispatch(addUser(res.data.user));
//         });
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <div className="flex justify-center mt-10 ">
//           <span className="loading loading-bars loading-sm justify-center text-indigo-600"></span>
//         </div>
//       ) : (
//         <div>
//           {error && (
//             <div className="flex justify-center mt-10 font-semibold text-gray-500">
//               <h3>Seems like Post Service is Down 🤐☹️</h3>
//             </div>
//           )}
//           {posts.length > 0 &&
//             posts
//               .slice()
//               .reverse()
//               .map((post: PostData) => (
//                 <div
//                   key={post._id}
//                   className="border p-10 text-center m-4 relative rounded-lg shadow-md  text-gray-600 bg-white"
//                 >
//                   <Link to={`/user/${post?.createdBy?._id}`}>
//                     <div className="flex space-x-3 -ms-8 -mt-8">
//                       <div className="w-12 border rounded-full overflow-hidden">
//                         <img
//                           src={post.createdBy?.profilePicture}
//                           alt="profilePicture"
//                         />
//                       </div>
//                       <div className="flex flex-col text-start">
//                         <p>{post.createdBy?.name}</p>
//                         {post.createdBy?.isPremium ? (
//                           <MdOutlineVerified className="ms-2.5 mt-1.5" />
//                         ) : (
//                           ""
//                         )}
//                         <p className="font-mono">@{post.createdBy?.userName}</p>
//                       </div>
//                     </div>
//                   </Link>
//                   <div
//                     className="flex justify-between cursor-pointer"
//                     onClick={() => handlePost(post._id)}
//                   >
//                     <div className="text-black font-medium  text-xl w-3/4 flex ">
//                       <div className="w-3/4 p-8">
//                         <p className="mt-2">{post.title}</p>
//                       </div>
//                     </div>
//                     {post.image.length > 0 && (
//                       <div className="w-1/4 border overflow-hidden">
//                         <img
//                           src={post?.image[0]}
//                           alt="image"
//                           className="w-full"
//                         />
//                       </div>
//                     )}
//                   </div>

//                   <div className="absolute bottom-0 left-0 mb-2 ml-2 flex space-x-3 cursor-default">
//                     <p>
//                       {dateParser(post.createdOn)} -{" "}
//                       {timeParser(post.createdOn)}
//                     </p>
//                     <BookOpenText size={23} />
//                     <p>{calculateReadTime(post.content)} min read</p>
//                     <Heart
//                       fill={post.like.includes(userData._id) ? "" : "none"}
//                       size={23}
//                     />
//                     <p>{post?.like?.length} Likes</p>
//                     <MessageCircle size={23} />
//                     <p>{post?.comment?.length} Comments</p>
//                   </div>
//                   <div className="absolute bottom-0 right-0 mr-2 mb-2 cursor-pointer">
//                     {userData.savedPosts?.includes(post._id) ? (
//                       <BookmarkCheck
//                         onClick={() => {
//                           handleSave(post._id);
//                         }}
//                       />
//                     ) : (
//                       <Bookmark
//                         onClick={() => {
//                           handleSave(post._id);
//                         }}
//                       />
//                     )}{" "}
//                   </div>
//                 </div>
//               ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForYou;
