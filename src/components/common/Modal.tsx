import axios from "axios";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  commentId: string | null;
  commentValue: string;
  onClose: () => void;
  postId: string | undefined;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  commentId,
  commentValue,
  postId,
  onClose,
}) => {
  const baseUrl: string = "http://localhost:4002/api/post";

  const [editedComment, setEditedComment] = useState<string>(commentValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedComment(e.target.value);
    setErrorMessage("");
  };

  const handlePost = () => {
    if (!editedComment.trim()) {
      setErrorMessage("Please enter a valid comment.");
      return;
    }

    const commentData = {
      commentId,
      editedComment,
    };

    setIsLoading(true);

    axios
      .put(`${baseUrl}/edit-comment/${postId}`, commentData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          onClose();
          setIsLoading(false);
        }, 100);
        setEditedComment("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Edit Comment</h2>
            <input
              type="text"
              placeholder="Edit comment"
              value={editedComment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handlePost}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mr-4 relative"
              >
                {isLoading ? (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-2.709c-.082-.29-.2-.564-.352-.818l1.787-1.788a7.963 7.963 0 011.383 2.99h-2.818zM20 12c0-4.418-3.582-8-8-8v4c2.24 0 4.273.915 5.736 2.394l1.787-1.787A9.969 9.969 0 0020 12zm-10 2.709c.082.29.2.564.352.818l-1.787 1.788a7.963 7.963 0 01-1.383-2.99h2.818z"
                      ></path>
                    </svg>
                  </span>
                ) : (
                  "Post"
                )}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
