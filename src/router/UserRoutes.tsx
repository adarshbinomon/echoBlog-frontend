import { Routes, Route, useParams } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import OtpVerify from "../pages/OtpVerify";
import Home from "../pages/Home";
import UserDetails from "../pages/UserDetails";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verify" element={<OtpVerify />} />
      <Route path="/" element={<Home />} />
      <Route path="/user-details/:userId" element={<UserDetails />} />
    </Routes>
  );
};

export default UserRoutes;
