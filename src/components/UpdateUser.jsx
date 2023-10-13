import React, { useContext, useState, useEffect, useId } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../context/AuthContext'
import { updateUserAndAuth } from '../hooks/updateAuth'
import { generateKeywords } from '../services';
import { v4 as uuid } from "uuid";

const UpdateUser = ({userData, handleCloseModalEdit}) => {

    const userIdAccsess = userData[0].id;
    // console.log(userIdAccsess);
    const { User } = useContext(AuthContext);
    // const [showModalEdit, setShowModalEdit] = useState(false);
    const [previewImageAvatar, setPreviewImageAvatar] = useState('');
    const [Avatar, setAvatar] = useState(null);
    const reader = new FileReader();
    reader.onloadend = () => {
        setPreviewImageAvatar(reader.result);
    };
    if (Avatar) {
        reader.readAsDataURL(Avatar);
    }
    // console.log(previewImageAvatar);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        // const file = e.target[0].file[0];    
        const fakeName = e.target[1].value;
        const fakeBio = e.target[2].value;
        const fakeHome = e.target[3].value;
        const fakeLive = e.target[4].value;
        const fakeBirthday = e.target[5].value;
        // if (avatarUrl) {
        const storage = getStorage();
        var storageRef = await ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, Avatar).then(
            () => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        const fieldsToUpdate = {
                            displayName: fakeName,
                            photoURL: downloadURL,
                            keywords: generateKeywords(fakeName),
                            bio: fakeBio,
                            live: fakeLive,
                            hometown: fakeHome,
                            birthday: fakeBirthday
                        };
                        updateUserAndAuth(userIdAccsess, fieldsToUpdate);
                        console.log(downloadURL);
                    } catch (error) {
                        console.error("Error updating User: ", error);
                    }
                    handleCloseModalEdit(false);
                });
            }
        )
    };

    return (
        <div className='container-modal-edit-profile'>
            <h2>
                Edit Profile
            </h2>
            {previewImageAvatar ? (
                <div className='preview-avatar-edit-form'>
                    <img src={previewImageAvatar} alt="Preview"
                        className='preview-avatar-register'
                    />
                </div>
            ) :
                <div className='preview-avatar-edit-form  '>
                    <img className='avatar-info-room' src={User.photoURL} />
                </div>
            }
            <h2>{User.displayName}</h2>
            <form onSubmit={handleUpdateUser} >
                <div className='uploadPhoto'>
                    <label htmlFor='Avatar'>+ Upload avatar</label>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        id="Avatar"
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                </div>
                <div className='form-update-user'>
                    <label htmlFor='name'>Name: </label>
                    <input id='name' rules={[{ required: true, message: 'Vui long dien thong tin!' }]} type='text' placeholder={userData[0].displayName} className='roomInput' />
                    <label htmlFor='name'>Bio: </label>
                    <input id='bio' rules={[{ required: true, message: 'Vui long dien thong tin!' }]} type='text' placeholder={userData[0].bio} className='roomInput' />
                    <label htmlFor='name'>Hometown: </label>
                    <input id='hometown' rules={[{ required: true, message: 'Vui long dien thong tin!' }]} type='text' placeholder={userData[0].hometown} className='roomInput' />
                    <label htmlFor='name'>Live: </label>
                    <input id='live' rules={[{ required: true, message: 'Vui long dien thong tin!' }]} type='text' placeholder={userData[0].live} className='roomInput' />
                    <label htmlFor='name'>Birthday: </label>
                    <input id='birthday' rules={[{ required: true, message: 'Vui long dien thong tin!' }]} type='text' placeholder={userData[0].birthday} className='roomInput' />
                    <button className='ButtonOnClickEdit'
                    >Lưu</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateUser;