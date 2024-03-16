import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserData, PostData } from "../../utils/interfaces/inteface"; 
import { useSelector } from "react-redux";
import { dateParser } from "../../helper/dateParser";
import { timeParser } from "../../helper/timeParser";
import { Save } from "lucide-react";
import { calculateReadTime } from "../../helper/wordCountToReadTime";
import { BookOpenText } from 'lucide-react';

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostData[]>([]);
  const postServiceBaseUrl: string = "http://localhost:4002/api/post";
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  useEffect(() => {
    axios
      .get(`${postServiceBaseUrl}/get-posts/${userData?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        console.log(posts.length);
      });
  }, [userData?._id]);

  const handlePost = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <div>
      {posts.length === 0 ? (
        <div className=" flex items-center">
          <p>No posts to show</p>
        </div>
      ) : (
        posts.slice().reverse().map((post: PostData, i: number) => (
          <div key={i} className="w-[700px] border p-10 text-center m-[20px] relative text-gray-600">
            <div className="flex space-x-3 -ms-8 -mt-8">
              <div className="w-12 border rounded-full overflow-hidden">
                <img src={userData?.profilePicture} alt="profilePicture" />
              </div>
              <div className="flex flex-col text-start">
                <p>{userData?.name}</p>
                <p className="font-mono">@{userData?.userName}</p>
              </div>
            </div>
            <div className="text-black font-medium cursor-pointer text-xl" onClick={() => handlePost(post?._id)}>
              <p className="mt-2 p-8">{post.title}</p>
            </div>
            <div className="absolute bottom-0 left-0 mb-2 ml-2 flex space-x-3">
              <p>
                {dateParser(post.createdOn)}-{timeParser(post.createdOn)}
              </p>
              <p> </p>
              <BookOpenText size={23} />
              <p>{calculateReadTime(post.content)} min read</p>
            </div>
            <div className="absolute bottom-0 right-0 mr-2 mb-2">
              <Save />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
