import MessageContainer from "../../components/chat/MessageContainer"
import SideBar from "../../components/chat/SideBar"
// import Footer from "../../components/common/Footer"
import Navbar from "../../components/common/Navbar"

const ChatScreen = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center min-h-screen pt-[100px]">
        <SideBar/>
        <MessageContainer/>
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default ChatScreen
