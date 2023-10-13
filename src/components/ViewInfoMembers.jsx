import React from "react";
import UserInfo from "./UserInfo";
import useFirestore from "../hooks/useFirestore";
// import firebase from '../firebase';
import { Button, Avatar } from "antd";
import Modal from "react-modal";

const ViewInfoMembers = ({ selectedMember }) => {
    const [seeProfile, setSeeProfile] = React.useState(null);
    React.useEffect(() => {
        console.log("reloading profile");
    }, [seeProfile]);
    

    const conditionUserData = React.useMemo(() => ({
        fieldName: 'uid',
        operator: '==',
        compareValue: selectedMember,
    }), [selectedMember]);
    const userDataInRoom = useFirestore('users', conditionUserData);
    console.log(userDataInRoom[0]);


    const conditionPost = React.useMemo(
        () => ({
            fieldName: 'senderId',
            operator: '==',
            compareValue: selectedMember,
        }),
        [selectedMember]
    );
    const postMember = useFirestore('posts', conditionPost);
    console.log(postMember)

    const handleOpenInfo = (a) => {
        setSeeProfile(a);
    }

    const handleCloseInfo = () => {
        setSeeProfile(null);
    }

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setSeeProfile(true);
        }, 30);

        return () => clearTimeout(timer); // Đảm bảo clear timeout khi component bị unmount
    }, []);

    return (

        <>
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
        </>
    )
}

export default ViewInfoMembers;