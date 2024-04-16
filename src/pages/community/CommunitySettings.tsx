import {
  Link,
  Route,
  Routes,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { CommunityData } from "../../utils/interfaces/inteface";
import Settings from "../../components/community/Settings";
import MemberManagement from "../../components/community/MemberManagement";
const groupServiceBaseUrl = import.meta.env.VITE_GROUP_SERVICE_BASEURL;

const CommunitySettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { communityId } = useParams();
  const [, setCommunity] = useState<CommunityData | null>(null);
  const [reload, setReload] = useState(false);

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
        navigate("/error");
      });
  }, [communityId, reload]);

  return (
    <>
      <Navbar />
      <div className="h-auto pt-16 flex justify-center">
        <div className="mt-10 flex-col text-center w-[700px]">
          <div className="flex justify-between text-gray-600">
            <Link to={`/community/settings/${communityId}`}>
              <span
                className={
                  location.pathname === `/community/settings/${communityId}`
                    ? "text-indigo-600 font-bold"
                    : "hover:text-indigo-600 hover:font-bold"
                }
              >
                Community Settings
              </span>
            </Link>
            <Link to={`/community/settings/${communityId}/members`}>
              <span
                className={
                  location.pathname ===
                  `/community/settings/${communityId}/members`
                    ? "text-indigo-600 font-bold"
                    : "hover:text-indigo-600 hover:font-bold"
                }
              >
                Members
              </span>
            </Link>
          </div>
          <div className="mt-2">
            <hr />
          </div>
          <div className="mt-10">
            <Routes>
              <Route path="/" element={<Settings />} />
              <Route path="/members" element={<MemberManagement />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunitySettings;
