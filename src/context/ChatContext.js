import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext'
import useFirestore from '../hooks/useFirestore'

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const { User } = useContext(AuthContext)

    const roomsCondition = React.useMemo(() => {
        return {
          fieldName: 'members',
          operator: 'array-contains',
          compareValue: User && User.uid ? User.uid : 'default_uid'
        };
      }, [User]);      
    const rooms = useFirestore('rooms', roomsCondition);
    // console.log(rooms);


    const selectedRoom = React.useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {}, [rooms, selectedRoomId]
    );

    return (
        <ChatContext.Provider value={{
            rooms,
            selectedRoomId,
            setSelectedRoomId,
            selectedRoom
        }}>
            {children}
        </ChatContext.Provider>
    );
};

