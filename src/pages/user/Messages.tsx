import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ChatScreen from '../../components/messages/ChatScreen'

const Messages = () => {
  return (
    <div>
      <Navbar/>
      <div className='min-h-screen pt-20'>
        <div className='flex'>
            <div className="w-1/4 "></div>
            <div className="w-3/4">
                <ChatScreen userName={'adaras'} />
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Messages
