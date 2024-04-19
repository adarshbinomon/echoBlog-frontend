import axios from "axios";
import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CommunityData, UserData } from "../../utils/interfaces/inteface";
import { Link } from "react-router-dom";
const groupServiceBaseUrl = import.meta.env.VITE_GROUP_SERVICE_BASEURL;


const CommunityList = () => {
  const [communities, setCommuinities] = useState<CommunityData>();

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  useEffect(() => {
    axios
      .get(`${groupServiceBaseUrl}/get-all-communities/${userData._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCommuinities(res.data.communities);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleJoin = (userId: string) => {
  //   try {
  //     axios.post(`${groupServiceBaseUrl}/join-group/${userId}`);
  //   } catch (error) {
      
  //   }
  // };

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-21xl font-semibold mb-6">Communities</h1>
        <div className="space-y-6">
          {communities?.slice(0, 4).map((community: CommunityData) => (
            <div
              key={community._id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <Link to={`/community-profile/${community._id}`}>
                  <img
                    src={community.profilePicture}
                    alt={community.name}
                    className="rounded-full w-16 h-16 object-cover mr-4"
                  />
                </Link>

                <Link to={`/community-profile/${community._id}`}>
                  <div>
                    <h2 className="text-lg font-semibold">{community.name}</h2>
                    <p className="text-gray-700 mt-2">{community.about}</p>
                  </div>
                </Link>
              </div>
              {/* <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={() => handleJoin(community._id)}
              >
                {community?.members && community.members.includes(community._id)
                  ? "Joined"
                  : "Join"}
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
