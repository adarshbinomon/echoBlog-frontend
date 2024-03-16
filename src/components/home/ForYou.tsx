import { useEffect, useState } from "react";
import axios from "axios";
import { PostData } from "../../utils/interfaces/inteface";
import { timeParser } from "../../helper/timeParser";
import { dateParser } from "../../helper/dateParser";
import { calculateReadTime } from "../../helper/wordCountToReadTime";
import { BookOpenText, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForYou = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const postServiceBaseUrl: string = "http://localhost:4002/api/post";
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${postServiceBaseUrl}/posts`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handlePost = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <div>
      {posts.length > 0 &&
        posts
          .slice()
          .reverse()
          .map((post: PostData, i: number) => (
            <div key={post._id} className="border p-10 text-center m-4 relative text-gray-600">
              <Link to={`/user/${post?.createdBy?._id}`}>
                <div className="flex space-x-3 -ms-8 -mt-8">
                  <div className="w-12 border rounded-full overflow-hidden">
                    <img src={post.createdBy?.profilePicture} alt="profilePicture" />
                  </div>
                  <div className="flex flex-col text-start">
                    <p>{post.createdBy?.name}</p>
                    <p className="font-mono">@{post.createdBy?.userName}</p>
                  </div>
                </div>
              </Link>
              <div className="text-black font-medium cursor-pointer text-xl" onClick={() => handlePost(post._id)}>
                <p className="mt-2 p-8">{post.title}</p>
              </div>
              <div className="absolute bottom-0 left-0 mb-2 ml-2 flex space-x-3">
                <p>{dateParser(post.createdOn)} - {timeParser(post.createdOn)}</p>
                <BookOpenText size={23} />
                <p>{calculateReadTime(post.content)} min read</p>
              </div>
              <div className="absolute bottom-0 right-0 mr-2 mb-2">
                <Save />
              </div>
            </div>
          ))}
    </div>
  );
};

export default ForYou;
