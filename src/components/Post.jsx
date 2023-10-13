import React, { useState } from 'react';
import { formatRelative } from 'date-fns/esm';
import { Button, Image } from "antd";
import edit from '../img/edit.png'
import trash from '../img/trash.png'
import firebase, { db } from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { updatePost } from '../hooks/updatePost';

function formatDate(seconds) {
    let formattedDate = '';

    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());

        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
}

const Post = ({ keyPost, avatar, displayName, createAt, text, img }) => {
    const [editPost, setEditPost] = useState(false);
    const [textEdit, setTextEdit] = useState("");
    // console.log(keyPost)

    const handleDeletePost = async () => {
        await deleteDoc(doc(db, "posts", keyPost))
    };

    const handleEditPost = async () => {
        try{
            const fieldsToUpdate = {
                text: textEdit
            }
            await updatePost(keyPost, fieldsToUpdate);
        } catch(error){
            console.error("Error updating: ", error);
        }
        setEditPost(false);
    }

    return (
        <div className="post">
            <div className='text-post'>
                <div className='col-text-post'>
                    <div className="avatar-post">
                        <Image src={avatar} />
                    </div>
                    <div className='text-post-name'>
                        <h4>{displayName}</h4>
                        <p>{formatDate(createAt?.seconds)}</p>
                    </div>
                </div>
                <div className='icon-struction'>
                    <img src={edit} alt="" onClick={() => setEditPost(true)} />
                    <img src={trash} alt="" onClick={handleDeletePost} />
                </div>
            </div>
            <div className='content-post'>
                {editPost ? (
                    <form>
                        <textarea
                            className="text-new-post-input"
                            type="text"
                            placeholder='Type something...'
                            onChange={(e) => setTextEdit(e.target.value)}
                            value={textEdit}
                        />
                        <Button className='save-post' onClick={handleEditPost}>Save</Button>
                    </form>
                ) : <>
                    <p>{text}</p>
                </>
                }
                {/* {text && (
                    <p>{text}</p>
                )} */}
                {img && (
                    <Image className='content-post-img' src={img} />
                )}
            </div>
        </div>
    )
}

export default Post;