import React, { useState, useEffect } from "react";
import useFirestore from "../hooks/useFirestore";

const SearchChatRoom = ({ onSelectChatRoom }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const chatRoomsList = useFirestore("rooms");

  // Thực hiện tìm kiếm danh sách phòng chat khi giá trị nhập vào thay đổi
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredChatRooms = chatRoomsList.filter((chatRoom) =>
      chatRoom.name.toLowerCase().includes(searchTerm)
    );
    setChatRooms(filteredChatRooms);
    setSearchTerm(searchTerm);
    setSelectedRoom("");
    onSelectChatRoom("");
    setShowSelect(true);
    
  };

  useEffect(() => {
    return () => {
      setSearchTerm("");
    }
  }, [selectedRoom]);


  return (
    <div className="searchRoom">
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Tìm kiếm phòng chat.." />
      {showSelect && ( // hiển thị ô select khi giá trị của showSelect là true
        <select onChange={(e) => onSelectChatRoom(e.target.value)}>
          {/* <option value="">-- Select Chat Room --</option> */}
          {chatRooms.map((chatRoom) => (
            <option key={chatRoom.id} value={chatRoom.id}>
              {chatRoom.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SearchChatRoom;


