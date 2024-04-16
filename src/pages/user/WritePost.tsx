import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import "quill/dist/quill.snow.css";
import QuillEditor from "../../components/post/Quill";
import { useParams } from "react-router-dom";

const WritePost: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();

  return (
    <>
      <Navbar />
      <div className="w-screen  pt-[50px] flex justify-center">
        <div className="pt-[65px] w-2/3 flex items-center flex-col">
          <div>
            <h2 className="text-5xl font-extrabold text-gray-600 hover:text-gray-950">
              Write Your Blog Here!
            </h2>
            <p className="text-xl pt-3"> Let your imaginations go wild.</p>
          </div>
          <div className="w-full h-auto  mt-5">
            {communityId ? (
              <QuillEditor communityId={communityId} />
            ) : (
              <QuillEditor />
            )}{" "}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WritePost;
