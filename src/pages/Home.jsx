import React, { useState, useContext, useEffect } from 'react'
import Video from "../img/video.mp4"
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import { ChatContext } from '../context/ChatContext';
import ContainerBirthday from '../components/ContainerBirthDay';


const Home = () => {
  const [showZoom, setShowZoom] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const { selectedRoom, selectedRoomId } = useContext(ChatContext);

  const setShowZoomState = () => {
    setShowZoom(true);
    setShowRoom(false);
    // selectedRoomId({});
    // console.log('Open zoom');
    // console.log(showZoom);
    // console.log(showRoom);
  };

  // console.log('Check');

  return (
    <div className='home'>
      <div className="container-main">
        <Sidebar onOpenZoom={setShowZoomState} />
        <ChatWindow showZoom={showZoom} showRoom={showRoom} />
        {/* <ContainerBirthday /> */}
      </div>
      <div class="video-background">
        <div class="overlay"></div>
        <video src={Video} muted loop autoPlay></video>
      </div>
    </div>
  );
};

export default Home;
