import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { exitChatRoom } from '../../../openapi/orval_query/api/chat/chat';
import useExitChatRoom from '../hooks/useExitChatRoom';
import '../Dropdown.css'

const ChatDropDown = () => {
    const navigate = useNavigate();
    const handleExitChatRoom = useExitChatRoom();

    return (
        <ul className="chat-dropdown" >
            <li>읽음 처리</li>
            <hr />
            <li onClick={() => { navigate('/chat/list') }}>채팅방 이름 변경</li>
            <hr />
            <li onClick={() => handleExitChatRoom(chatRoom.chatRoomId)}>채팅방 나가기</li>
        </ul>
    );
};

export default ChatDropDown;