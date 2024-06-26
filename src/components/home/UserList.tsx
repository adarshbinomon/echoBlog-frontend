import { useEffect, useState } from "react";
import axios from "axios";
import { UserData } from "../../utils/interfaces/inteface";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlices";
import { MdOutlineVerified } from "react-icons/md";
const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;

const UserList = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${userServiceBaseUrl}/find-users/${userData._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [userData._id]);

  const handleFollow = (userId: string) => {
    const data = {
      userId: userData._id,
      userToBeFollowedId: userId,
    };
    axios
      .post(`${userServiceBaseUrl}/follow-user`, data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(addUser(res.data.user));
        toast.success(res.data.message);
      });
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-21xl text-gray-500 font-semibold mb-6">
          People you may know{" "}
        </h1>
        <div className="space-y-6">
          {users.slice(0, 4).map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <Link to={`/user/${user._id}`}>
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="rounded-full w-16 h-16 object-cover mr-4"
                  />
                </Link>

                <Link to={`/user/${user._id}`}>
                  <div>
                    <h2 className="text-lg font-semibold flex">
                      {user.name}{" "}
                      {user.isPremium && (
                        <MdOutlineVerified className="ms-1.5 mt-1.5" />
                      )}
                    </h2>
                    <p className="text-gray-600">@{user.userName}</p>
                    <p className="text-gray-700 mt-2">{user.bio}</p>
                  </div>
                </Link>
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={() => handleFollow(user._id)}
              >
                {userData?.following && userData.following.includes(user._id)
                  ? "Following"
                  : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
