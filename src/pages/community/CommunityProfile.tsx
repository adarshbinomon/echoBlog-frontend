import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { dateParser } from "../../helper/dateParser";
import { Link } from "react-router-dom";
import {
  FileText,
  CalendarDays,
  Settings,
  UsersRound,
  SquareUser,
  PencilLine ,
  SquareCheckBig,
} from "lucide-react";
import { CommunityData, UserData } from "../../utils/interfaces/inteface";
import toast from "react-hot-toast";
import { reload } from "firebase/auth";

const CommunityProfile = () => {
  const groupServiceBaseUrl = "http://localhost:4003/api/group";
  const { communityId } = useParams<{ communityId: string }>();
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [reload, setReload] = useState(false);

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  useEffect(() => {
    axios
      .get(`${groupServiceBaseUrl}/get-community/${communityId}`, {
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

  const createdOn = dateParser(community?.createdOn);

  const handleJoin = async () => {
    try {
      const data = {
        userId: userData._id,
        communityId: community?._id,
      };
      axios
        .put(`${groupServiceBaseUrl}/join-community`, data, {
          withCredentials: true,
        })
        .then((res: any) => {
          setReload(true);
          toast.success(res.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-screen relative">
        <Navbar />
        <div className="p-16 flex items-center flex-col">
          {/* Community Header */}
          <div className="border border-gray-200 w-[700px] h-[200px] mt-8 overflow-hidden">
            <img src={community?.coverPicture} alt="coverPicture" />
          </div>
          {/* Other Community Details */}
          <div className="justify-start px-5 w-[700px] mt-[-75px]">
            {/* Profile Picture */}
            <div className="border border-gray-200 w-[150px] h-[150px] rounded-full justify-center flex items-center overflow-hidden">
              <img src={community?.profilePicture} alt="profile-picture" />
            </div>
            {/* Follow and Settings Buttons */}
            <div className="flex justify-end mt-[-70px] me-[-30px]">
              {community?.members.includes(userData?._id) && (
                <button
                  type="button"
                  className={`flex space-x-1 items-center text-indigo-700 hover:text-white border border-indigo-700 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 transition duration-300 ease-in-out bg-white dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 hover:bg-indigo-700`}
                >
                  <PencilLine  className="w-5 h-5 mx-1" />{" "}
                  {/* Assuming 'Write' is an icon from lucide-react */}
                  <span className="font-semibold">Write</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleJoin}
                className={`flex space-x-1 items-center text-indigo-700 hover:text-white border border-indigo-700 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 transition duration-300 ease-in-out bg-white dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 hover:bg-indigo-700`}
              >
                {community?.members.includes(userData?._id) ? (
                  <>
                    <SquareCheckBig className="w-5 h-5 mx-1 text-green-500" />
                    <span className="font-semibold">Joined</span>
                  </>
                ) : (
                  <>
                    <SquareUser className="w-5 h-5 mx-1" />
                    <span className="font-semibold">Join</span>
                  </>
                )}
              </button>
              {community?.createdBy === userData._id ? (
                <button
                  type="button"
                  className={`flex space-x-1 items-center text-indigo-700 hover:text-white border border-indigo-700 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 transition duration-300 ease-in-out bg-white dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 hover:bg-indigo-700`}
                >
                  <Settings className="w-5 h-5 mx-1" />
                  <span className="font-semibold">Settings</span>
                </button>
              ) : // Placeholder for else condition, you can add code or leave it empty
              null}
            </div>
            {/* Community Details */}
            <div className="flex flex-col space-y-2 ms-[-20px]">
              <div
                id="name"
                className="flex container justify-start text-xl font-bold text-gray-900 w-auto mt-5 font"
              >
                <p>{community?.name}</p>
              </div>
              <div
                id="userName"
                className="flex justify-start mt-[5px] font-thin font-mono text-gray-500 w-[150px]"
              >
                <p>{community?.about}</p>
              </div>
              <div className="flex space-x-2 text-gray-500">
                <FileText size={20} color="gray" />
                <p>{community?.post?.length} Blogs</p>
              </div>
              <div className="flex space-x-2 text-gray-500">
                <UsersRound size={20} color="gray" />
                <p>{community?.members.length} Members</p>
              </div>
              <div className="flex space-x-2 text-gray-500">
                <CalendarDays size={20} color="gray" />
                <p>Created on {createdOn}</p>
              </div>
              {/* Navigation Links */}
              <div className="flex flex-row">
                <span className="hover:text-indigo-600 hover:text-lg transform hover:scale-105 transition-transform transform-origin-top hover:cursor-pointer pe-10 hover:pe-9">
                  Blogs
                </span>
                <Link to={"profile/community"}>
                  <span className="hover:text-indigo-600 hover:text-lg transform hover:scale-105 transition-transform transform-origin-top hover:cursor-pointer px-10 hover:pe-9">
                    Members
                  </span>
                </Link>
              </div>
              <hr className="w-[700px] "></hr>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CommunityProfile;
