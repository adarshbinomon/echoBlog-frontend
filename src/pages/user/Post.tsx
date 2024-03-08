import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuillViewer from "../../components/QuillViewer";

interface Post {
  content: string;
  _id: string;
}

const Post = () => {
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState<Post | undefined>();

  const baseUrl: string = "http://localhost:4002/api/post";

  useEffect(() => {
    axios.get(`${baseUrl}/${id}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setPost(res.data.post);
    });
  });

  return (
    <>
      <Navbar />
      <div>
        <div className="flex   text-center items-center justify-center">
          <div className="w-[700px] border m-5 mt-[100px] text-center  ">
            {post && <QuillViewer content={post.content} />}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Post;
