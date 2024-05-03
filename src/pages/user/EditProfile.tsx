import {
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import EditProfileAccountTab from "../../components/profile/EditProfileAccountTab";
import EditProfileProfileTab from "../../components/profile/EditProfileProfileTab";

const EditProfile = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="h-auto pt-16 flex justify-center max-w-screen ">
        <div className="mt-10 flex-col text-center w-[700px]">
          <div className="flex justify-between text-gray-600">
            <Link to="/edit-profile/">
              <span
                className={
                  location.pathname === "/edit-profile/"
                    ? "text-indigo-600 font-bold"
                    : "hover:text-indigo-600 hover:font-bold"
                }
              >
                Account
              </span>
            </Link>

            <Link to="/edit-profile/profile">
              <span
                className={
                  location.pathname === "/edit-profile/profile"
                    ? "text-indigo-600 font-bold"
                    : "hover:text-indigo-600 hover:font-bold"
                }
              >
                Profile
              </span>
            </Link>
            <span className="hover:text-indigo-600 hover:font-bold ">
              Notifications
            </span>
            <span className="hover:text-indigo-600 hover:font-bold ">
              Membership and Payment
            </span>
            {/* <span className="hover:text-indigo-600 hover:font-bold ">
              Security and Login
            </span> */}
          </div>
          <div className="mt-2">
            <hr />
          </div>
          <div className="mt-10">
            <Routes>
              <Route path="/" element={<EditProfileAccountTab />} />
              <Route path="/profile" element={<EditProfileProfileTab />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
