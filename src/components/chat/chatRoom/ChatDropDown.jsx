import React from 'react';
import { useChatRoomContext } from './ChatRoomContext';
import { Navigate, useNavigate } from 'react-router-dom';
import useExitChatRoom from '../hooks/useExitChatRoom';
import '../Dropdown.css'
import useModifyRoom from '../hooks/useModifyRoom';

const ChatDropDown = () => {
    const navigate = useNavigate();
    const { roomId } = useChatRoomContext();
    const handleExitChatRoom = useExitChatRoom();
    const handleModifyChatRoom = useModifyRoom();

    return (
        <ul className='chat-dropdown'>
            <li>약속 신청</li>
            <hr />
            <li onClick={() => handleModifyChatRoom(chatRoom.chatRoomId) }>채팅방 이름 변경</li>
            <hr />
            <li onClick={() => { navigate('/chat/list') }}>채팅방 목록</li>
            <hr />
            <li onClick={() => handleExitChatRoom(chatRoom.chatRoomId)}>채팅방 나가기</li>
        </ul>
    );
};

export default ChatDropDown;