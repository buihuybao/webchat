import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";
import addDocument from '../services';
import { v4 as uuid } from "uuid";
import { Button, Image } from 'antd';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";



const NewPost = () => { 
    const [text, setText] = useState("");
    const [preViewImagePost, setPreviewImagePost] = useState('');
    const [img, setImg] = useState(null);
    const { User } = useContext(AuthContext);

    const reader = new FileReader();
    reader.onload = () => {
        setPreviewImagePost(reader.result);
    }
    if(img){
        reader.readAsDataURL(img);
    }

    const handleSend = async () => {
        if (img) {
            var storageRef = await ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    addDocument('posts', {
                        // id: uuid(),
                        senderId: User.uid,
                        text,
                        img: downloadURL,
                    })
                });
            })
        } else {
            addDocument('posts', {
                // id: uuid(),
                senderId: User.uid,
                text,
            })
        }

        setText("");
        setImg(null);
    };

    return (
        <div className="newpost">
            <div className="text-new-post">
                <div className="avatar-post">
                    <Image src={User.photoURL} />
                </div>
                <textarea
                    className="text-new-post-input"
                    type="text"
                    placeholder="Type something..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
            </div>
            {preViewImagePost && (
                <div className="Img-new-post">
                    <img src={preViewImagePost} />
                </div>
            )}

            <div className="send">
                {/* <img src={Attach} alt="" /> */}
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <Button onClick={handleSend}>
                    <p>Post</p>
                </Button>
            </div>
        </div>
    )
}

export default NewPost;