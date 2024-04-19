import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { PostData } from "../../utils/interfaces/inteface";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const postServiceBaseUrl = import.meta.env.VITE_POST_SERVICE_BASEURL;

interface QuillEditProps {
  post: PostData;
}

const QuillEdit: React.FC<QuillEditProps> = ({ post }) => {
  const quillRef = useRef<Quill | null>(null);
  const [title, setTitle] = useState<string>(post.title);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Quill editor
    if (!quillRef.current) {
      quillRef.current = new Quill("#editor", {
        theme: "snow",
        placeholder: "Write your content here.",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      if (post) {
        quillRef.current.root.innerHTML = post.content;
      }

      // quillRef.current.on("text-change", (delta, oldDelta, source) => {});
    }
  }, [post.content]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSaveContent = () => {
    if (quillRef.current) {
      const data = {
        content: quillRef.current.root.innerHTML,
        title: title,
      };
      axios
        .put(`${postServiceBaseUrl}/edit-post/${postId}`, data, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Post successfully edited!");
          navigate(`/post/${postId}`);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      <div className="mt-5 mb-5">
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Title:
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="title"
            autoComplete="title"
            required
            value={title}
            onBlur={handleTitleChange}
            className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="">
        <label
          htmlFor="content"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Content:
        </label>
        <div id="editor" style={{ height: "400px" }} />
      </div>
      <button
        type="button"
        className="bg-indigo-600 text-white rounded p-2 mt-5 float-right"
        onClick={handleSaveContent}
      >
        Save Content
      </button>
    </>
  );
};

export default QuillEdit;
