import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import QuillEdit from "../../components/post/QuillEdit";
import { useLocation, useNavigate } from "react-router-dom";
import { PostData, UserData } from "../../utils/interfaces/inteface";
import { useSelector } from "react-redux";

const EditPost: React.FC = () => {
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.name) {
      navigate("/login");
    }
  }, []);

  const location = useLocation();
  const post: PostData | undefined = location.state as PostData | undefined;

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
