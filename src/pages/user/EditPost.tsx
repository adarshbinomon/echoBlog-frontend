import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import QuillEdit from "../../components/post/QuillEdit";
import { useLocation } from "react-router-dom";
import { PostData } from "../../utils/interfaces/inteface";

const EditPost: React.FC = () => {
  const location = useLocation();
  const post: PostData = location.state as PostData; // Assuming location.state is always defined as PostData

  return (
    <>
      <Navbar />
      <div className="flex justify-center pt-20">
        <div className="h-full w-3/4">
          <QuillEdit post={post} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
