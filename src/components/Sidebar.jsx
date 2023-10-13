import React, { useState, useContext, useEffect } from 'react'
import UserInfo from './UserInfo'
import RoomList from './RoomList'
// import AddRoom from './AddRoom'
import ViewProfile from './ViewProfile'
import Zoom from '../ChatVideo/Zoom'
import { Avatar, Button, Typography, Form, Input } from 'antd'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import Modal from "react-modal";
import close from '../img/close.png'
import logo from '../img/logo.png'
import logOut from '../img/logout.png';
import { auth, storage } from "../firebase"
import { signOut } from "firebase/auth"
import firebase from '../firebase';
import useFirestore from '../hooks/useFirestore'


const Sidebar = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const { User } = useContext(AuthContext);
  // const [userData, setUser] = React.useState([]);
  // console.log(User.uid);


  const handleOpenInfo = (a) => {
    setShowInfo(a);
  }

  const handleCloseInfo = () => {
    setShowInfo(false);
  }

  const handleOpenZoom = (user) => {
    setSelectedUser(user);
  };

  const handleCloseZoom = () => {
    setSelectedUser(null);
  };

  const conditionUser = React.useMemo(() => ({
    fieldName: 'uid',
    operator: '==',
    compareValue: User.uid,
  }), [User.uid]);
  const userData = useFirestore('users', conditionUser);
  // console.log(User.uid);
  // console.log(userData);


  const condition = React.useMemo(
    () => ({
      fieldName: 'senderId',
      operator: '==',
      compareValue: User.uid,
    }),
    [User.uid]
  );
  const post = useFirestore('posts', condition);

  return (
    <div className='Sidebar'>
      <div className='Logo-web'>
        <img src={logo} />
        <Button className='ButtonLogOut' onClick={() => signOut(auth)}>
          <img src={logOut} alt="" className='logOut-img' />
        </Button>
      </div>
      <RoomList />
      <div className='view-instruction'>
        <Button className='btn-join-zoom' key={User.id} onClick={handleOpenZoom}>
          <h4>Join Zoom</h4>
        </Button>
        <div className='view-profile'>
          <h4>View Profile</h4>
          <Button className='btn-view-profile' onClick={() => handleOpenInfo(true)}>
            <Avatar className='anh-icon-user' src={User.photoURL}>{User.photoURL ? '' : User.displayName?.charAt(0)?.toUperrCase()}</Avatar>
            <div className='info-user-small'>
              <p className=' nameUser'>
                {User.displayName}
              </p>
              <p className=' mailUser'>
                {User.email}
              </p>
            </div>
          </Button>
        </div>
      </div>
      <Modal
        className="JoinZoom"
        isOpen={selectedUser !== null}
        onRequestClose={handleCloseZoom}
        contentLabel="Join Zoom"
      >
        {selectedUser && (
          <div className="Modal-join-zoom">
            <Zoom />
            <div className='icon-close'>
              <img src={close} onClick={handleCloseZoom} />
            </div>
          </div>

        )}
      </Modal>
      <Modal
        className="show-Info"
        isOpen={showInfo === true}
        onRequestClose={handleCloseInfo}
        contentLabel='Open Info'
      >
        {showInfo && (
          <div className='Modal-Show-Info'>
            <UserInfo userData={userData} post={post} />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Sidebar