import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserData } from "../../utils/interfaces/inteface";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";
  const [users, setUsers] = useState<UserData[]>([]);

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

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
  }, []);

  const handleFollow = (userId: string) => {
    console.log("Followed user with ID:", userId);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-21xl font-semibold mb-6">People you may know </h1>
        <div className="space-y-6">
          {users.map((user) => (
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
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="text-gray-600">@{user.userName}</p>
                    <p className="text-gray-700 mt-2">{user.bio}</p>
                  </div>
                </Link>
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={() => handleFollow(user._id)}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
