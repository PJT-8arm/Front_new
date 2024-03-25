import React from 'react';
import { useChatRoomContext } from './ChatRoomContext';
import { Navigate, useNavigate } from 'react-router-dom';
import useExitChatRoom from '../hooks/useExitChatRoom';
import '../Dropdown.css'

const ChatDropDown = ({ onModify }) => {
    const navigate = useNavigate();
    const { roomId } = useChatRoomContext();
    const handleExitChatRoom = useExitChatRoom();


    return (
        <ul className='chat-dropdown'>
            <li>약속 신청</li>
            <hr />
            <li onClick={() => onModify()}>채팅방 이름 변경</li>
            <hr />
            <li onClick={() => { navigate('/chat/list') }}>채팅방 목록</li>
            <hr />
            <li onClick={() => handleExitChatRoom(roomId)}>채팅방 나가기</li>
        </ul>
    );
};

export default ChatDropDown;