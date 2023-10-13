import { Avatar, Typography, Button } from 'antd'
import React, { useContext } from 'react'
import { formatRelative } from 'date-fns/esm';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from '../context/AuthContext';
import firebase, { db } from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

const Message = ({ KeyUser, userId, text, photoURL, displayName, createAt }) => {
  const { User } = useContext(AuthContext);
  // console.log(KeyUser);


  const handleDelete = async () => {
    await deleteDoc(doc(db, "messages", KeyUser));
    // console.log(User.uid, KeyUser);
  };

  return (
    <div className='WrapperStyled'>
      <div>
        <Avatar src={photoURL}></Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">{formatDate(createAt?.seconds)}</Typography.Text>
      </div>
      <div className='textMessage'>
        <Typography.Text className="content">
          <p>{text}</p>
        </Typography.Text>
        {userId === User.uid && (
          <Button className='btn-delete-mess' onClick={handleDelete}>Thu hồi</Button>
        )}
      </div>
    </div>
  )
}

export default Message