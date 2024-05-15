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
import Modal from "../../components/common/Modal";
import PostReportReasons from "../../utils/enums/report.reasons";
const postServiceBaseUrl = import.meta.env.VITE_POST_SERVICE_BASEURL;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingComments(true);
    axios
      .get(`${postServiceBaseUrl}/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          setPost(res.data.post);
          setUser(res.data.user);
          setLiked(res.data.post.like.includes(userData._id));
          setLike(res.data.post.like.length);
          setComments(res.data.post.comment);
          setLoadingComments(false);
          setReload(false);
        } else {
          navigate("/404");
        }
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
        navigate("/404");
      });
  }, [
    id,
    userData._id,
    newComments,
    replyVisibility,
    editingCommentId,
    comment,
    isModalOpen,
    reload,
    navigate,
    postServiceBaseUrl,
  ]);

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
              .get(`${postServiceBaseUrl}/delete-post/${post?._id}`, {
                withCredentials: true,
              })
              .then(() => {
                navigate("/profile");
              })
              .catch((error) => {
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

    axios
      .post(`${postServiceBaseUrl}/like-Post/${post?._id}`, id, {
        withCredentials: true,
      })
      .then((res) => {
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
      .post(
        `${postServiceBaseUrl}/comment-post/${post?._id}`,
        {
          userId: userData._id,
          name: userData.name,
          userName: userData.userName,
          comment: commentInput,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status) {
          const newComment = res.data.comment[0];
          setNewComments((prevNewComments) => [...prevNewComments, newComment]);
          setCommentInput("");
        } else {
          console.error("Failed to add comment. Please try again.");
          toast.error("Failed to add comment. Please try again.");
        }
      })
      .catch((error) => {
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
        .post(
          `${postServiceBaseUrl}/reply-to-comment/${post?._id}`,
          commentData,
          {
            withCredentials: true,
          }
        )
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

  const handleCommentEdit = (commentId: string, comment: string) => {
    setEditingCommentId(commentId);
    setComment(comment);
    setIsModalOpen(true);
  };

  const handleCommentLike = (commentId: string, isLiked: boolean) => {
    const data = {
      isLiked,
      userId: userData._id,
      postId: post?._id,
    };
    axios
      .post(`${postServiceBaseUrl}/like-comment/${commentId}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setReload(true);
      })
      .catch((error) => console.log(error));
  };

  const handleCommentDelete = (commentId: string) => {
    const data = {
      commentId: commentId,
    };
    confirmAlert({
      title: "Confirm to Delete comment",
      message: "Are you sure to delete this comment?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            axios
              .post(`${postServiceBaseUrl}/delete-comment/${post?._id}`, data, {
                withCredentials: true,
              })
              .then(() => {
                setReload(true);
                toast.success("Comment Deleted!");
              })
              .catch((error) => {
                console.log("error in comment deletion:", error);
              });
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const handlePostReport = (reason: string) => {
    const data = {
      userId: userData._id,
      reason,
    };

    axios
      .post(`${postServiceBaseUrl}/report-post/${post?._id}`, data, {
        withCredentials: true,
      })
      .then(() => {
        setShowDropdown(!showDropdown);
        toast.success("reported successfully");
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center max-w-screen">
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
              {post ? (
                <QuillViewer content={post?.content} />
              ) : (
                <div className="flex flex-col gap-4 w-full h-[500px] ">
                  <div className="skeleton  w-full bg-slate-200 h-3/6"></div>
                  <div className="skeleton h-1/6 w-28 bg-slate-200"></div>
                  <div className="skeleton h-1/6 w-full bg-slate-200"></div>
                  <div className="skeleton h-1/6 w-full bg-slate-200"></div>
                </div>
              )}
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

              {userData?._id !== user?._id && (
                <div className="ml-auto flex justify-between items-center">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 relative"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    Report
                    <span className="ml-2">&#9662;</span> {/* Downward arrow */}
                  </button>
                  {showDropdown && (
                    <div className="absolute z-10 bg-white mt-1 rounded-md shadow-lg">
                      {/* Dropdown content */}
                      {Object.values(PostReportReasons).map((reason, index) => (
                        <button
                          key={index}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => handlePostReport(reason)}
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

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
                      <Heart
                        fill={
                          comment.likes.includes(userData?._id)
                            ? "black"
                            : "none"
                        }
                        onClick={() =>
                          handleCommentLike(
                            comment._id,
                            comment.likes.includes(userData?._id) ? true : false
                          )
                        }
                        className="cursor-pointer mr-2"
                      />{" "}
                      <p>{comment.likes.length} Likes</p>
                      <p
                        className="cursor-pointer hover:text-black"
                        onClick={() => setReplyVisibility(comment._id)}
                      >
                        Reply
                      </p>
                      {userData?.userName === comment?.userName && (
                        <div className=" flex space-x-4">
                          <p
                            className="cursor-pointer hover:text-black"
                            onClick={() =>
                              handleCommentEdit(comment._id, comment.comment)
                            }
                          >
                            Edit
                          </p>{" "}
                          <p
                            onClick={() => handleCommentDelete(comment._id)}
                            className="cursor-pointer hover:text-black"
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                    {comment?.replies.length > 0 && (
                      <div className="ms-10 mt-2">
                        <p className="font-semibold pt-2 pb-2">Replies:</p>
                        {comment?.replies.map(
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
      <Modal
        isOpen={isModalOpen}
        commentId={editingCommentId}
        commentValue={comment}
        postId={post?._id}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCommentId(null);
          setComment("");
        }}
      />
    </>
  );
};

export default PostPage;
