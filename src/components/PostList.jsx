import React, { useEffect, useContext, useState } from "react";
import firebase from '../firebase'
import { AuthContext } from "../context/AuthContext";
import Post from "./Post";

const PostList = (props) => {
    const { post, userData } = props;
    // console.log(post)

    return (
        <div>
            {post.map((pst) => (
                <Post
                    keyPost={pst.id}
                    avatar={userData[0].photoURL}
                    displayName={userData[0].displayName}
                    createAt={pst.createAt}
                    text={pst.text}
                    img={pst.img}
                />
            ))
            }
        </div>
    )
}

export default PostList;