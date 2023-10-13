import useFirestore from "../hooks/useFirestore";
import firebase, { auth, db, storage } from '../firebase';
import { Button } from "antd";

const LeaveRoomButton = ({ roomId, userId }) => {
//   const firestore = useFirestore();

  const handleLeaveRoom = () => {
    db.collection('rooms').doc(roomId).update({
      members: firebase.firestore.FieldValue.arrayRemove(userId)
    })
    .then(() => {
      console.log("Successfully left room");
    })
    .catch((error) => {
      console.error("Error leaving room: ", error);
    });
  };

  return (
    <Button onClick={handleLeaveRoom} className="LeaveRoom">Rời nhóm</Button>
  );
};

export default LeaveRoomButton;
