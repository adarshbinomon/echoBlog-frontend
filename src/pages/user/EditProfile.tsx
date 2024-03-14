import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { Link, Route, Routes } from "react-router-dom";
import EditProfileAccountTab from "../../components/profile/EditProfileAccountTab";
import EditProfileProfileTab from "../../components/profile/EditProfileProfileTab";

const EditProfile = () => {
  return (
    <>
      <Navbar />
      <div className="h-auto pt-16 flex justify-center ">
        <div className="mt-10 flex-col text-center w-[700px]">
          <div className="flex justify-between text-gray-600">
            <Link to="/edit-profile/">
              <span className="hover:text-indigo-600 hover:font-bold ">
                Account
              </span>
            </Link>

            <Link to="/edit-profile/profile">
              <span className="hover:text-indigo-600 hover:font-bold ">
                Profile
              </span>
            </Link>
            <span className="hover:text-indigo-600 hover:font-bold ">
              Notifications
            </span>
            <span className="hover:text-indigo-600 hover:font-bold ">
              Membership and Payment
            </span>
            <span className="hover:text-indigo-600 hover:font-bold ">
              Security and Login
            </span>
          </div>
            <div className="mt-2">
            <hr />
            </div>
          <div className=" mt-10 ">
            <Routes>
              <Route path="/" element={<EditProfileAccountTab />}></Route>
              <Route path="/profile" element={<EditProfileProfileTab />}></Route>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
