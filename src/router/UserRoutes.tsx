import { Routes, Route } from "react-router-dom";
import Signup from "../pages/user/Signup";
import Login from "../pages/user/Login";
import OtpVerify from "../pages/user/OtpVerify";
import Home from "../pages/user/Home";
import UserDetails from "../pages/user/UserDetails";
import Profile from "../pages/user/Profile";
import EditProfile from "../pages/user/EditProfile";
import WritePost from "../pages/user/WritePost";
import Post from "../pages/user/Post";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verify" element={<OtpVerify />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user-details/:userId" element={<UserDetails />} />
      <Route path="/edit-profile/*" element={<EditProfile />} />
      <Route path="/write-post/*" element={<WritePost />} />
      <Route path="/post/:id" element={<Post />} />
    </Routes>
  );
};

export default UserRoutes;
