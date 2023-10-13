import React, { useContext } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import RoomList from './RoomList';
import addDocument from '../services';

export default function AddRoom() {
    // const { User } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(() => {
            addDocument('rooms', { ...form.getFieldsValue(), members: [User.uid] });
            console.log(form.getFieldsValue());
            // reset form value
            form.resetFields();
        }).catch((error) => {
            console.error(error);
        });
    };

    else {
        const cover = addOn + image.name;
        const storage = getStorage();
        var storageRef = await ref(storage, `images/${cover}`);
        const upload = uploadBytesResumable(storageRef, image, image).then(
            () => {
                getDownloadURL(storageRef).then(function (url) {
                    console.log(url);


                    addDoc(postsCollectionRef, {
                        title,
                        postContent,
                        created_at,
                        cover: { cover, url },
                        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
                    });
                }
                );
            }
        );
    }



    return (
        <div className='addRoom'>
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
            <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file">
                <img src={Img} alt="" />
            </label>
            {/* <Form form={form} layout='vertical'
            >
                <Form.Item label='Tên phòng' name='name' rules={[{ required: true, message: 'Hãy nhập tên phòng!' }]}>
                    <Input className='roomInput' placeholder='Nhập tên phòng' />
                </Form.Item>
                <Form.Item label='Mô tả' name='des' rules={[{ required: true, message: 'Hãy nhập mô tả phòng!' }]}>
                    <Input.TextArea className='roomInput' placeholder='Nhập mô tả' />
                </Form.Item>
                <Form.Item label='Link avatar room' name='anh' rules={[{ required: true, message: 'Hãy nhập link ảnh phòng!' }]}>
                    <Input className='roomInput' placeholder='Nhập link ảnh' />
                </Form.Item>
                <Button onClick={handleOk}>
                    Thêm phòng
                </Button>
            </Form> */}
        </div>
    );
}
