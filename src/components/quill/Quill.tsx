import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import toast from "react-hot-toast";

const QuillEditor: React.FC = () => {
  const quillRef = useRef<Quill | null>(null);

  const baseUrl: string = "http://localhost:4002/api/post";

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  const [title, setTitle] = useState<string>('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    console.log(title);
    
  };

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.root.parentNode?.removeChild(quillRef.current.root);
      quillRef.current = null;
    }

    quillRef.current = new Quill("#editor", {
      theme: "snow",
      placeholder: 'Write your content here.',
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

    quillRef.current.on("text-change", (delta, oldDelta, source) => {});

    return () => {
      if (quillRef.current && quillRef.current.root.parentNode) {
        quillRef.current.root.parentNode.removeChild(quillRef.current.root);
        quillRef.current = null;
      }
    };
  }, []);

  const handleSaveContent = () => {
    if (quillRef.current) {
      const content = quillRef.current.root.innerHTML;
      const data = {
        content: content,
        createdBy: userData._id,
        title: title
      };
      axios
        .post(`${baseUrl}/create`, data, { withCredentials: true })
        .then((res) => {
          if (res.data.status) {
            toast.success("Posted Successfully");
          } else {
            toast.error("Post Failed!");
          }
        })
        .catch((error) => {
          console.log("error", error);
          toast.error("Post Failed!");
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
            onBlur={(e)=>handleTitleChange(e)}
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

export default QuillEditor;
