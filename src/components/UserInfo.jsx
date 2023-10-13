import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import Modal from "react-modal";
import { Form, Input, Image, Button } from 'antd';
import Posts from './Posts';
import UpdateUser from './UpdateUser';


const UserInfo = (props) => {
  const { User } = useContext(AuthContext);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [previewImageAvatar, setPreviewImageAvatar] = useState('');
  const [Avatar, setAvatar] = useState(null);
  const { userData, post } = props;
  console.log(userData);

  const handleOpenModalEdit = (e) => {
    setShowModalEdit(e);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  return (
    <div className='UserInfo'>
      <div className='img-header'>
        <video src='https://www.studystream.live/assets/videos/solo-vibe-background.webm' muted loop autoPlay />
        <video src='https://www.studystream.live/assets/videos/solo-vibe-background.webm' muted loop autoPlay />
        <video src='https://www.studystream.live/assets/videos/solo-vibe-background.webm' muted loop autoPlay />
        <div className="avatar-user-info">
          <Image src={userData[0].photoURL} className='img-avatar-user-info' />
        </div>
      </div>
      <div className='Name-Info'>
        <p>{userData[0].displayName}</p>
        {User.uid === userData[0].uid ? (
          <div className='edit-profile'>
            <Button
              className='btn-edit-profile'
              onClick={() => { handleOpenModalEdit(true) }}
            >
              Edit Your Profile
            </Button>
          </div>
        ) : <></>}
        <Modal
          className='Modal-edit-profile'
          onRequestClose={handleCloseModalEdit}
          isOpen={showModalEdit === true}
        >
          {showModalEdit && (
            <UpdateUser userData={userData} handleCloseModalEdit={handleCloseModalEdit} />
          )}

        </Modal>
      </div>
      <div className='container-user'>
        <div className='container-info'>
          <h2>Intro</h2>
          <div className='detail-info'>
            <div className='bio'>
              <p>{userData[0].bio}</p>
            </div>
            <div className='info-contact'>
              <p>From {userData[0].hometown}</p>
              <p>Lives in {userData[0].live}</p>
              <p>email {userData[0].email}</p>
              <p>Birthday {userData[0].birthday}</p>
            </div>
          </div>
        </div>

        <div className='post-info'>
          <Posts post={post} userData={userData} />
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
