import { MouseEventHandler, useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QuillViewer from "../../components/post/QuillViewer";
import {
  UserData,
  PostData,
  CommentData,
} from "../../utils/interfaces/inteface";
import { dateParser } from "../../helper/dateParser";
import { timeParser } from "../../helper/timeParser";
import { calculateReadTime } from "../../helper/wordCountToReadTime";
import { BookOpenText, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loadingComments, setLoadingComments] = useState(false); // Added state for loading comments

  const userData = useSelector(
    (state: { persisted: { user: { userData: UserData } } }) =>
      state.persisted.user.userData
  );

  const navigate = useNavigate();

  const baseUrl: string = "http://localhost:4002/api/post";

  useEffect(() => {
    axios.get(`${baseUrl}/${id}`, { withCredentials: true }).then((res) => {
      setPost(res.data.post);
      setUser(res.data.user);
      if (res.data.post.like.includes(userData._id)) {
        setLiked(true);
      }
      setLike(res.data.post.like.length);
      setComments(res.data.post.comment);
      setLoadingComments(false); // Set loadingComments to false after fetching comments
    });
  }, [id, userData._id]);

  const handleEdit: MouseEventHandler<HTMLButtonElement> | undefined = post
    ? () => {
        navigate(`/edit-post/${post._id}`, { state: post });
      }
    : undefined;

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this post?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            axios
              .get(`${baseUrl}/delete-post/${post?._id}`)
              .then(() => {
                navigate("/profile");
              })
              .catch((error: any) => {
                console.log("error in post deletion:", error);
              });
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const handleLike = () => {
    const id = { userId: userData._id, liked };

    axios.post(`${baseUrl}/like-Post/${post?._id}`, id).then((res: any) => {
      if (res.status) {
        if (liked) {
          setLiked(false);
          setLike(res.data.likes);
        } else {
          setLiked(true);
          setLike(res.data.likes);
        }
      }
    });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim() === "") {
      return;
    }
  
    setLoadingComments(true); // Set loadingComments to true while adding comment
  
    axios
      .post(`${baseUrl}/comment-post/${post?._id}`, {
        userId: userData._id,
        name: userData.name,
        userName: userData.userName,
        comment: commentInput,
      })
      .then((res: any) => {
        if (res.data.status) {
          // Extract the comment data from res.data.comment
          const newComment = res.data.comment[0];
          setComments([...comments, newComment]);
          toast.success("Comment added successfully!");
          setCommentInput("");
          setLoadingComments(false);
        } else {
          console.error("Failed to add comment. Please try again.");
          toast.error("Failed to add comment. Please try again.");
          setLoadingComments(false);
        }
      })
      .catch((error: any) => {
        console.log("error adding comment:", error);
        toast.error("Failed to add comment. Please try again.");
        setLoadingComments(false);
      });
  };
  

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-2/3 m-5 mt-20">
          <div className="border p-5">
            <div className="flex items-center mb-5">
              {user && (
                <img
                  src={user.profilePicture}
                  alt="profilePicture"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div className="ml-3">
                <p className="font-bold">{user?.name}</p>
                <p className="text-sm text-gray-500">@{user?.userName}</p>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-3">{post?.title}</h1>
            <div className="text-gray-600 mb-3">
              {dateParser(post?.createdOn)} - {timeParser(post?.createdOn)}
            </div>
            <div className="flex items-center mb-3">
              <BookOpenText size={20} className="mr-2" />
              <span>{calculateReadTime(post?.content)} min read</span>
            </div>
            <div className="mb-3">
              {post && <QuillViewer content={post?.content} />}
            </div>
            <div className="flex items-center">
              <Heart
                fill={liked ? "" : "none"}
                onClick={handleLike}
                className="cursor-pointer mr-2"
              />
              <p> {like} </p>
              <span className="ms-2"> likes</span>

              <div>
                <form onSubmit={handleComment}>
                  <div className="flex items-center space-x-2 ms-5">
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Comment :
                    </label>
                    <div className="mt-2">
                      <input
                        id="comment"
                        name="comment"
                        type="text"
                        autoComplete="comment"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        required
                        className="px-1 block w-full rounded-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <button
                      type="submit"
                      className="ml-2 px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-500"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
              {userData?._id === user?._id && (
                <>
                  <button
                    onClick={handleEdit}
                    className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Comments:</h3>
            {loadingComments ? (
              <p className="text-sm text-gray-500">Loading comments...</p>
            ) : comments.length > 0 ? (
              comments.map((comment: CommentData, index: number) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 mb-2 border-rounded"
                >
                  <div>
                    <p className="font-semibold">{comment.name}</p>
                    <p className="text-sm text-gray-500">{comment.userName}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostPage;
