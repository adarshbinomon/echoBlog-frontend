import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserData } from "../utils/interfaces/inteface";
import toast from "react-hot-toast";

const QuillEditor: React.FC = () => {
  const quillRef = useRef<Quill | null>(null);

  const baseUrl: string = "http://localhost:4002/api/post";

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.root.parentNode?.removeChild(quillRef.current.root);
      quillRef.current = null;
    }

    quillRef.current = new Quill("#editor", {
      theme: "snow",
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
      <div>
        <div id="editor" style={{ height: "400px" }} />
      </div>
      <button
        type="button"
        className="bg-indigo-600 text-white rounded p-2 mt-5 float-right"
        onClick={handleSaveContent}
      >
        Save Content
      </button>
      <div className="text-gray-500 font-light ">
        <p>
          Select the text to change font size or effects like bold, italics,
          etc.
        </p>
        <p>Use numbers to add a numbered list.</p>
      </div>
    </>
  );
};

export default QuillEditor;
