import React from 'react';
import { Form, Input, Button, Image } from 'antd';
import NewPost from './NewPost';
import Post from './PostList';
import PostList from './PostList';
import { AuthContext } from '../context/AuthContext';

const Posts = (props) => {
    const { post, userData } = props;
    const { User } = React.useContext(AuthContext);
    console.log(userData);
    console.log(User);
    return (
        <div className="new-post">
            {User.uid === userData[0].uid ? (
                <NewPost />
            ) : <></>}
            <PostList post={post} userData={userData} />
        </div>
    )
}

export default Posts;