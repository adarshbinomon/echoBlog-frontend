import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component

interface PostListProps {
  communityId: string | undefined;
}

const Members: React.FC<PostListProps> = ({ communityId }) => {
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";
  const [users, setUsers] = useState<any[]>([]); // Define users as an array of any type

  useEffect(() => {
    axios
      .get(`${userServiceBaseUrl}/get-community-members/${communityId}`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.error("Error fetching community members:", error);
      });
  }, [communityId]);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-lg font-semibold mb-4">Community Members</h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <Link to={`/user/${user._id}`} key={user._id}>
            <li className="flex items-center py-4">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.bio}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Members;
