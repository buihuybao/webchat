import { Avatar, Button, Form, Input } from 'antd';
import React from 'react';
import Modal from "react-modal";
import { AuthContext } from '../context/AuthContext';
import { useContext, useCallback, useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { ChatContext } from '../context/ChatContext';
import SearchChatRoom from './searchRoom';
import addDocument from '../services';
import Img from '../img/img.png'
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable, getStorage } from "firebase/storage";
import { db, storage } from "../firebase";


const RoomList = () => {
  const { User } = useContext(AuthContext);
  const { rooms, setSelectedRoomId } = useContext(ChatContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  const handleSelectChatRoom = useCallback((selectedRoomId) => {
    setSelectedRoomId(selectedRoomId);
  }, []);

  const [previewImage, setPreviewImage] = useState('');
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [img, setImg] = useState(null);
  // const { User } = useContext(AuthContext);

  const reader = new FileReader();
  reader.onloadend = () => {
    setPreviewImage(reader.result);
  };
  if (img) {
    reader.readAsDataURL(img);
  }

  const handleOk = async () => {
    if (img) {
      const storage = getStorage();
      var storageRef = await ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img).then(
        () => {
          getDownloadURL(storageRef).then(function (downloadURL) {
            addDocument('rooms', {
              idRoom: uuid(),
              name,
              des,
              img: downloadURL, 
              members: [User.uid]
            })
          });
        }
      );

    } else {
      addDocument('rooms', {
        idRoom: uuid(),
        name,
        des,
        members: [User.uid]
        // img: "https://i.pinimg.com/originals/11/e4/4d/11e44d85743b28fa62121b5ae71a914b.png"
      })
    }

    setName("");
    setDes("");
    setImg(null);
    setSelectedUser(null);
  };

  const handleAddRoom = (user) => {
    console.log(user);
    setSelectedUser(user);
  }

  const handleCloseModal = () => {
    setName("");
    setDes("");
    setImg(null);
    setSelectedUser(null);
  }

  return (
    <div className='RoomList'>
      <div className="header-chat-room">
        <h2>Chat</h2>
        <Button className='btn-addRoom' key={User.id} onClick={() => handleAddRoom(User)}><p>+ New Chat</p></Button>
      </div>
      <SearchChatRoom onSelectChatRoom={handleSelectChatRoom} />
      <div className="Room">
        {rooms.map((room) => (
          <a key={room.id} onClick={() => setSelectedRoomId(room.id)}>
            {room.img ? (
              < Avatar className='anhRoom' src={room.img} />
            ) :
              <>
                < Avatar className='anhRoom' src="https://firebasestorage.googleapis.com/v0/b/studystream-6a108.appspot.com/o/37841833-a71a-43a4-a234-a0f206f4d0da?alt=media&token=9dbb4f26-f74a-4b2b-9b56-7fb80711cc06" />
              </>
            }
            <p className='nameRoom'>{room.name}</p>
          </a>
        ))}
      </div>
      <Modal
        className="ModalAddRoomComponent"
        isOpen={selectedUser !== null}
        onRequestClose={handleCloseModal}
        contentLabel="Add Room"
      >
        {selectedUser && (
          <div className='addRoom'>
            <h2>Create New Room Chat</h2>
            <h5>Create your perfect environment to study</h5>
            <div className='roomInputText'>
              <p>Name</p>
              <input
                // className="roomInput"
                type="text"
                placeholder="name..."
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <p>Description</p>
              <input
                // className="roomInput"
                type="text"
                placeholder="des..."
                onChange={(e) => setDes(e.target.value)}
                value={des}
              />
            </div>
            <div className='roomInputText'>
              <p>Upload avatar</p>
              {img && (
                <>
                  <p>Upload success!</p>
                </>
              )}
              {previewImage && (
                <div className='preview-avatar-room'>
                  <Avatar src={previewImage} alt="Preview" className='preview-avatar' />
                </div>
              )}
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
              />
              <label htmlFor="file">
                <img src={Img} alt="" />
              </label>
            </div>
            <div className='row-btn-add'>
              <Button
                className='btn-add-create'
                onClick={handleOk}
              >
                Create
              </Button>
              <Button
                className='btn-add-cancel'
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RoomList;
