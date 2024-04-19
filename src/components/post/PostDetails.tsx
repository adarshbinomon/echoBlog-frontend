import { dateParser } from "../../helper/dateParser";
import { timeParser } from "../../helper/timeParser";
import { BookOpenText, Save } from "lucide-react";
import { calculateReadTime } from "../../helper/wordCountToReadTime";
import { PostData, UserData } from "../../utils/interfaces/inteface";

interface PostDetailsProps {
  user: UserData;
  post: PostData;
}

const PostDetails: React.FC<PostDetailsProps> = ({ user, post }) => {

  return (
    <div className="text-center mx-2 container relative -my-4 text-gray-600">
      <div className="flex space-x-3 items-center">
        <div className="w-12 border rounded-full overflow-hidden">
          <img src={user.profilePicture} alt="profilePicture" />
        </div>
        <div className="flex flex-col text-start">
          <p>{user.name}</p>
          <p className="font-mono">@{user.userName}</p>
        </div>
      </div>
      <div className="text-3xl pb-9 text-black font-extrabold mt-3">
        <p>{post.title}</p>
      </div>
      <div className="absolute bottom-0 left-0 mb-2 ml-2 flex items-center">
        <p className="mr-2">
          {dateParser(post.createdOn)}-{timeParser(post.createdOn)}
        </p>
        <BookOpenText size={23} />
        <p className="ml-2">{calculateReadTime(post.content)} min read</p>
      </div>
      <div className="absolute bottom-0 right-0 mr-2 mb-2">
        <Save />
      </div>
    </div>
  );
};

export default PostDetails;
