import React, { useContext, useState, useRef, useEffect } from 'react'
import { Avatar, Button, Tooltip, Form, Input, Image, Alert } from 'antd'
import Message from './Message'
import { AuthContext } from '../context/AuthContext';
import useFirestore from '../hooks/useFirestore';
import { ChatContext } from '../context/ChatContext';
import addDocument from '../services';
import AddMembers from './AddMembers'
import BackgroundSelector from './BackgroundSelector';
import DeleteChat from './DeleteChat';
import RoomMembers from './MembersInRoom';
import DEFAULT_AVATAR from '../img/default.jpg'
import Zoom from '../ChatVideo/Zoom';
import icon1 from '../img/icon1.png'
import icon2 from '../img/icon2.png'

const ChatWindow = ({ showZoom, showRoom }) => {
    const { selectedRoom, selectedRoomId } = useContext(ChatContext);
    const { User } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('');
    const [form] = Form.useForm();
    const inputRef = useRef(null);
    const messageListRef = useRef(null);
    const [img, setImg] = useState(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleOnSubmit = () => {
        if (img) {

        } else {
            addDocument('messages', {
                text: inputValue,
                roomId: selectedRoom.id,
                uid: User.uid,
                displayName: User.displayName,
                photoURL: User.photoURL
            });

            form.resetFields(['message']);

            // focus to input again after submit
            if (inputRef?.current) {
                setTimeout(() => {
                    inputRef.current.focus();
                });
            }
        }
    };

    const condition = React.useMemo(
        () => ({
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom.id,
        }),
        [selectedRoom.id]
    );

    const messages = useFirestore('messages', condition);

    // console.log(messages);

    useEffect(() => {
        // scroll to bottom after message changed
        if (messageListRef?.current) {
            messageListRef.current.scrollTop =
                messageListRef.current.scrollHeight + 50;
        }
    }, [messages]);

    //Change the background
    const [background, setBackground] = useState('');

    const handleBackgroundChange = (newBackground) => {
        setBackground(newBackground);
    };

    if (selectedRoom.id) {
        showRoom = true;
        showZoom = false;
    }

    return (
        <div className='ChatWindow'>
            {showRoom ? (
                <>
                    <div className='Chats' style={{ backgroundImage: `url(${background})` }}>
                        <div className='header-chat'>
                            <div className='header-info'>
                                <p className='header-title'>{selectedRoom.name}</p>
                            </div>
                            <div className="info-gr">
                            </div>
                        </div>
                        <div id='ContentStyled'>
                            <div id='MessageList' ref={messageListRef}>
                                {messages.map((mes) =>
                                    <Message
                                        KeyUser={mes.id}
                                        userId={mes.uid}
                                        text={mes.text}
                                        photoURL={mes.photoURL}
                                        displayName={mes.displayName}
                                        createAt={mes.createAt}
                                    />
                                )}
                            </div>
                            <Form id='formMessage' form={form}>
                                <Form.Item className='inputMess' name='message'>
                                    <Input
                                        ref={inputRef}
                                        onChange={handleInputChange}
                                        onPressEnter={handleOnSubmit}
                                        placeholder='Nhập tin nhắn...'
                                        autoComplete='off'
                                    />
                                </Form.Item>
                                <Button className='buttonMess' type='primary' onClick={handleOnSubmit}>
                                    Gửi
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className='info-room' >
                        <div className="avatar-room">
                            <Image className='avatar-info-room' src={selectedRoom.img || DEFAULT_AVATAR} />
                        </div>
                        <h2>{selectedRoom.name}</h2>
                        <p className='des-room'>{selectedRoom.des}</p>
                        <BackgroundSelector onBackgroundChange={handleBackgroundChange} />
                        <AddMembers />
                        <RoomMembers />
                        <DeleteChat
                            roomId={selectedRoomId}
                            userId={User.uid}
                        />
                    </div>
                </>
            ) : showZoom ? (
                <Zoom />
            ) : <>
                <div className='container-header'>
                    <div className='three-color'>
                        <div className='color-1'></div>
                        <div className='color-2'></div>
                        <div className='color-3'></div>
                    </div>
                    <h1>Working towards your <br /> dreams is hard. Not reaching <br /> them is harder.</h1>
                    <h4>Get work done with others from around the 🌎</h4>
                    <div className='Video-study'>
                        <video className='Video-small' src='https://www.studystream.live/assets/videos/solo-vibe-background.webm' muted loop autoPlay />
                        <img className='icon1' src={icon1} />
                        <img className='icon2' src={icon2} />
                    </div>
                </div>
            </>
            }

        </div>
    )
}

export default ChatWindow