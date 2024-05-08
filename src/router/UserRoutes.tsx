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
import EditPost from "../pages/user/EditPost";
import ThirdProfile from "../pages/user/ThirdProfile";
import CommunityProfile from "../pages/community/CommunityProfile";
import CommunitySettings from "../pages/community/CommunitySettings";
import Error from "../pages/common/Error";
import ProtectedRoutes from "../components/common/ProtectedRoutes";
import ChatScreen from "../pages/chat/ChatScreen";
import ForgotPassword from "../pages/user/ForgotPassword";
import EditProfilePremium from "../components/profile/EditProfilePremium";
import VideoCall from "../components/chat/VideoCall";
import useListenMessages from "../hooks/useListenMessages";
import useListenToVideoCalls from "../hooks/useListenToVideoCalls";
import IncomingCall from "../components/chat/IncomingCall";
import { useState } from "react";

const UserRoutes = () => {
  useListenMessages(); // to listen for messages all the time when a user is logged in
  const callDetails = useListenToVideoCalls();  // to listen for calls all the time when a user is logged in
  console.log("callDetails", callDetails);

  const [showIncomingCallModal, setShowIncomingCallModal] = useState(false);

  if (callDetails && !showIncomingCallModal) {
    setShowIncomingCallModal(true);
  }

  return (
    <>
      {showIncomingCallModal && <IncomingCall callDetails={callDetails} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/*" element={<Home />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/user-details/:userId" element={<UserDetails />} />
          <Route path="/edit-profile/*" element={<EditProfile />} />
          <Route path="/write-post/*" element={<WritePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
          <Route path="/user/:userId" element={<ThirdProfile />} />
          <Route path="chat" element={<ChatScreen />} />
          <Route path="videocall/:roomId" element={<VideoCall />} />
          <Route
            path="/community-profile/:communityId/*"
            element={<CommunityProfile />}
          />
          <Route
            path="/community/write-post/:communityId"
            element={<WritePost />}
          />
          <Route
            path="/community/settings/:communityId/*"
            element={<CommunitySettings />}
          />
          <Route path="/get-premium" element={<EditProfilePremium />} />
        </Route>
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
