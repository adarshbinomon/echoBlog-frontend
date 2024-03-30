import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CommunityData } from "../../utils/interfaces/inteface";
import toast from "react-hot-toast";

const Settings = () => {
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [reload, setReload] = useState(false);
  const groupServiceBaseUrl = "http://localhost:4003/api/group";
  const { communityId } = useParams();
  const navigate = useNavigate();

  const [communityName, setCommunityName] = useState("");
  const [communityAbout, setCommunityAbout] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");

  useEffect(() => {
    axios
      .get(`${groupServiceBaseUrl}/get-community/${communityId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCommunity(res.data.community);
        setReload(false);
        setProfilePicture(res.data.community.profilePicture);
        setCoverPicture(res.data.community.coverPicture);
        setCommunityName(res.data.community.name)
        setCommunityAbout(res.data.community.about)
      })
      .catch((error) => {
        console.error("Error fetching community data:", error);
      });
  }, [communityId, reload]);

  const handleSaveSettings: React.MouseEventHandler<HTMLButtonElement> = () => {
    const data = {
      name: communityName,
      about: communityAbout,
      profilePicture: profilePicture,
      coverPicture: coverPicture,
    };
    console.log("Settings saved:", data);
    axios
      .put(`${groupServiceBaseUrl}/community-edit/${community?._id}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success("Community edited successfully!");
          setTimeout(() => {
            navigate(`/community-profile/${community?._id}`);
          }, 3000); // 3 seconds delay
        }
      })
      .catch((error) => {
        console.error("Error editing community:", error);
        toast.error("Error editing community");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen ">
        <div className="max-w-lg mx-auto pt-24 p-8">
          <h1 className="text-3xl font-semibold mb-6">Community Settings</h1>
          <div className="mb-4">
            <label
              htmlFor="communityName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Community Name
            </label>
            <input
              type="text"
              id="communityName"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="communityAbout"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Community About
            </label>
            <textarea
              id="communityAbout"
              value={communityAbout}
              onChange={(e) => setCommunityAbout(e.target.value)}
              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Profile Picture
            </label>
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="mt-2 rounded-md"
                style={{ maxWidth: "150px" }}
              />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="coverPicture"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cover Picture
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePictureUpload"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Profile Picture Upload
            </label>
            <input
              type="file"
              id="profilePictureUpload"
              accept="image/*"
              onChange={(e) =>
                setProfilePicture(URL.createObjectURL(e.target.files[0]))
              }
              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {coverPicture && (
            <img
              src={coverPicture}
              alt="Cover Preview"
              className="mt-2 rounded-md"
              style={{ maxWidth: "400px" }}
            />
          )}
          <div className="mb-4">
            <label
              htmlFor="coverPictureUpload"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cover Picture Upload
            </label>
            <input
              type="file"
              id="coverPictureUpload"
              accept="image/*"
              onChange={(e) =>
                setCoverPicture(URL.createObjectURL(e.target.files[0]))
              }
              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveSettings}
              className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
