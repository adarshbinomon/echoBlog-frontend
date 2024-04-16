import { useEffect, useState } from "react";
import { CommunityData, UserData } from "../../utils/interfaces/inteface";
import { useParams } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import the confirmAlert function
import "react-confirm-alert/src/react-confirm-alert.css";
import React from "react";
const groupServiceBaseUrl = import.meta.env.VITE_GROUP_SERVICE_BASEURL;

const MemberManagement = () => {
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [reload, setReload] = useState(false);
  const { communityId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null); // Assuming you have a UserData interface

  useEffect(() => {
    axios
      .get(`${groupServiceBaseUrl}/get-community-with-users/${communityId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCommunity(res.data.community);
        setReload(false);
      })
      .catch((error) => {
        console.error("Error fetching community data:", error);
      });
  }, [communityId, reload]);

  useEffect(() => {
    // Fetch user data or set it based on your application logic
    const user = localStorage.getItem("userData"); // Example: Fetch user data from localStorage
    setUserData(user ? JSON.parse(user) : null);
  }, []);

  const handleRemoveMember = (memberId: string) => {
    confirmAlert({
      title: "Confirm to Remove Member",
      message: "Are you sure you want to remove this member from the group?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const data = {
              memberId: memberId,
            };
            axios
              .post(
                `${groupServiceBaseUrl}/remove-member/${community?._id}`,
                data,
                {
                  withCredentials: true,
                }
              )
              .then(() => {
                setReload(true);
              })
              .catch((error) => {
                console.error("Error removing member:", error);
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleMakeAdmin = (memberId: string) => {
    const data = {
      memberId,
    };
    axios
      .post(`${groupServiceBaseUrl}/make-admin/${community?._id}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
    console.log("Making member admin with ID:", memberId);
  };

  return (
    <div className="h-screen">
      <h1 className="text-2xl font-bold mb-4">Members of {community?.name}</h1>
      <table className="w-full bg-white border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Name</th>
            <th className="border border-gray-400 p-2">Username</th>
            <th className="border border-gray-400 p-2">Email</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {community?.members.map((member) => (
            <React.Fragment key={member._id}>
              {community?.createdBy !== member?._id && (
                <tr>
                  <td className="border border-gray-400 p-2">{member.name}</td>
                  <td className="border border-gray-400 p-2">
                    {member.userName}
                  </td>
                  <td className="border border-gray-400 p-2">{member.email}</td>
                  <td className="border border-gray-400 p-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2"
                      onClick={() => handleRemoveMember(member._id)}
                    >
                      Remove
                    </button>
                    {community?.admins.includes(userData?._id) && (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                        onClick={() => handleMakeAdmin(member._id)}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberManagement;
