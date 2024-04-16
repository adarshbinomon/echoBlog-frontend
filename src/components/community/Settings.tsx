import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CommunityData } from "../../utils/interfaces/inteface";
import toast from "react-hot-toast";
const groupServiceBaseUrl = import.meta.env.VITE_GROUP_SERVICE_BASEURL;

const Settings = () => {
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [reload, setReload] = useState(false);
  const { communityId } = useParams();
  const navigate = useNavigate();

  const [communityName, setCommunityName] = useState("");
  const [communityAbout, setCommunityAbout] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [coverPicture, setCoverPicture] = useState<File | null>(null);

  useEffect(() => {
    axios
      .get(`${groupServiceBaseUrl}/get-community/${communityId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCommunity(res.data.community);
        setReload(false);
        setCommunityName(res.data.community.name);
        setCommunityAbout(res.data.community.about);
      })
      .catch((error) => {
        console.error("Error fetching community data:", error);
      });
  }, [communityId, reload]);

  const handleSaveSettings = () => {
    const formData = new FormData();
    formData.append("name", communityName);
    formData.append("about", communityAbout);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    if (coverPicture) {
      formData.append("coverPicture", coverPicture);
    }

    axios
      .put(`${groupServiceBaseUrl}/community-edit/${community?._id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success("Community edited successfully!");
          setTimeout(() => {
            navigate(`/community-profile/${community?._id}`);
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error editing community:", error);
        toast.error("Error editing community");
      });
  };

  return (
    <div>
      <div>
        <div className="max-w-lg mx-auto px-8">
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
              htmlFor="profilePictureUpload"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Profile Picture Upload
            </label>
            <input
              type="file"
              id="profilePictureUpload"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
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
              onChange={(e) => setCoverPicture(e.target.files?.[0] || null)}
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
    </div>
  );
};

export default Settings;
