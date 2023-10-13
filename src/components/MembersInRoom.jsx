import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import firebase from '../firebase';
import ViewInfoMembers from "./ViewInfoMembers";
import Modal from "react-modal";
import useFirestore from "../hooks/useFirestore";
import UserInfo from "./UserInfo";

const RoomMembers = () => {
    const [users, setUsers] = React.useState([]);
    const [idMember, setIdMember] = React.useState(null);
    const { selectedRoom, selectedRoomId } = useContext(ChatContext);
    const [selectedMember, setSelectedMember] = React.useState(null);

    React.useEffect(() => {
        console.log(selectedRoom.members);
    }, [selectedRoom.members]);

    React.useEffect(() => {
        const db = firebase.firestore();
        const usersRef = db.collection('users');

        const fetchData = async () => {
            const usersData = await usersRef
                .where('uid', 'in', selectedRoom.members)
                .get();

            const usersArray = [];
            usersData.forEach(userDoc => {
                const user = userDoc.data();
                usersArray.push(user);
            });

            setUsers(usersArray);
        };

        fetchData();
    }, [selectedRoom.members]);

    const handleOpenMembers = (user) => {
        setSelectedMember(user);
    };

    const handleCloseModal = () => {
        setSelectedMember(null);
    };


    //**********************//
    console.log(selectedMember)
    const [seeProfile, setSeeProfile] = React.useState(null);
    const conditionUserData = React.useMemo(() => ({
        fieldName: 'uid',
        operator: '==',
        compareValue: selectedMember,
    }), [selectedMember]);
    const userDataInRoom = useFirestore('users', conditionUserData);
    // console.log(userDataInRoom[0]);


    const conditionPost = React.useMemo(
        () => ({
            fieldName: 'senderId',
            operator: '==',
            compareValue: selectedMember,
        }),
        [selectedMember]
    );
    const postMember = useFirestore('posts', conditionPost);
    // console.log(postMember)

    const handleOpenInfo = (a) => {
        setSeeProfile(a);
    }

    const handleCloseInfo = () => {
        setSeeProfile(null);
        setSelectedMember(null);
        console.log(selectedMember)
    }

    const timer = setTimeout(() => {
        setSeeProfile(true);
    }, 3000);

    return (
        <div className="MembersRoom">
            <h4>Danh sách thành viên</h4>
            <div className="listMembers">
                {users.map(user => (
                    <div key={user.uid} className="Members" selectedMember={user.id} onClick={() => handleOpenMembers(user.uid)}>
                        <img src={user.photoURL} alt={user.displayName} />
                        <p>{user.displayName}</p>
                    </div>
                ))}
            </div>
            {selectedMember && (
                <Modal
                    className="show-Info"
                    isOpen={seeProfile !== null}
                    onRequestClose={handleCloseInfo}
                    contentLabel="Edit User Modal"
                >
                    {selectedMember && (
                        <div className='Modal-Show-Info'>
                            <UserInfo userData={userDataInRoom} post={postMember} />
                        </div>
                    )}
                </Modal>
            )}
        </div>

    );
};

export default RoomMembers;
