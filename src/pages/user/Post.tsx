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
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComments, setNewComments] = useState<CommentData[]>([]);
  const [replyVisibility, setReplyVisibility] = useState<string>("hidden");
  const [replyValue, setReplyValue] = useState<string>("");

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.name) {
      navigate("/login");
    }
  }, []);

  const baseUrl: string = "http://localhost:4002/api/post";

  useEffect(() => {
    axios
      .get(`${baseUrl}/${id}`, { withCredentials: true })
      .then((res: any) => {
        setPost(res.data.post);
        setUser(res.data.user);
        setLiked(res.data.post.like.includes(userData._id));
        setLike(res.data.post.like.length);
        setComments(res.data.post.comment);
        setLoadingComments(false);
      })
      .catch((error: any) => {
        console.error("Error fetching post data:", error);
      });
  }, [id, userData._id, newComments, replyVisibility]);

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
        setLiked((prevLiked) => !prevLiked);
        setLike(res.data.likes);
      }
    });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim() === "") {
      return;
    }

    setLoadingComments(true);
    axios
      .post(`${baseUrl}/comment-post/${post?._id}`, {
        userId: userData._id,
        name: userData.name,
        userName: userData.userName,
        comment: commentInput,
      })
      .then((res: any) => {
        if (res.data.status) {
          const newComment = res.data.comment[0];
          setNewComments((prevNewComments) => [...prevNewComments, newComment]);
          setCommentInput("");
        } else {
          console.error("Failed to add comment. Please try again.");
          toast.error("Failed to add comment. Please try again.");
        }
      })
      .catch((error: any) => {
        console.log("error adding comment:", error);
        toast.error("Failed to add comment. Please try again.");
      })
      .finally(() => setLoadingComments(false));
  };

  useEffect(() => {
    if (newComments.length > 0) {
      setComments((prevComments) => [...prevComments, ...newComments]);
      setNewComments([]);
    }
  }, [newComments]);

  const handleReply = (commentId: string) => {
    try {
      const commentData = {
        commentId: commentId,
        reply: replyValue,
        name: userData.name,
        userId: userData._id,
        userName: userData.userName,
      };
      axios
        .post(`${baseUrl}/reply-to-comment/${post?._id}`, commentData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status) {
            setReplyVisibility("hidden");
            setReplyValue("");
            toast.success("Reply Successfull✅");
          }
        });
    } catch (error) {
      console.log("error in reply to comment:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-2/3 m-5 mt-20">
          <div className="border p-5 bg-white rounded-md">
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
            <div className="flex items-center mb-3 ">
              <BookOpenText size={20} className="mr-2" />
              <span>{calculateReadTime(post?.content)} min read</span>
            </div>
            <div className="mb-3 ">
              {post && <QuillViewer content={post?.content} />}
            </div>
            <div className="flex items-center">
              <Heart
                fill={liked ? "" : "none"}
                onClick={handleLike}
                className="cursor-pointer mr-2 "
              />
              <p style={{ userSelect: "none" }}>{like}</p>
              <span className="ms-2" style={{ userSelect: "none" }}>
                {" "}
                likes
              </span>

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
          <div>
            <form onSubmit={handleComment}>
              <div className="flex items-center space-x-2 ms-5 ">
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

          <div className="mt-5">
            <h3 className="text-xl font-semibold">Comments:</h3>
            {loadingComments ? (
              <p className="text-sm text-gray-500">Loading comments...</p>
            ) : comments.length > 0 ? (
              comments.map((comment: CommentData, index: number) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 mb-2 p-2 bg-white rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{comment.name}</p>
                    <p className="text-sm text-gray-500">@{comment.userName}</p>
                    <p>{comment.comment}</p>
                    <div className="flex space-x-4 text-gray-400">
                      <p
                        className="cursor-pointer hover:text-black"
                        onClick={() => setReplyVisibility(comment._id)}
                      >
                        Reply
                      </p>
                      {userData?.userName === comment?.userName && (
                        <div className=" flex space-x-4">
                          <p className="cursor-pointer hover:text-black">
                            Edit
                          </p>{" "}
                          <p className="cursor-pointer hover:text-black">
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                    {comment.replies.length > 0 && (
                      <div className="ms-10 mt-2">
                        <p className="font-semibold pt-2 pb-2">Replies:</p>
                        {comment.replies.map(
                          (reply: CommentData, index: number) => (
                            <div key={index}>
                              <p className="font-semibold">{reply.name}</p>
                              <p className="text-sm text-gray-500">
                                @{reply.userName}
                              </p>
                              <p>{reply.reply}</p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {replyVisibility === comment._id && (
                      <div>
                        <div className="flex items-center space-x-2 ">
                          <label
                            htmlFor="reply"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Reply to this Comment :
                          </label>
                          <div className="mt-2 ">
                            <input
                              id="reply"
                              name="reply"
                              type="text"
                              autoComplete="reply"
                              required
                              value={replyValue}
                              onChange={(e) => setReplyValue(e.target.value)}
                              className="px-1 block w-full rounded-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <button
                            onClick={() => handleReply(comment._id)}
                            className="ml-2 px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-500"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    )}
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
