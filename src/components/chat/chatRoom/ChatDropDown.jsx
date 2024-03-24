import React from 'react';
import { useChatRoomContext } from './ChatRoomContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { exitChatRoom } from '../../../openapi/orval_query/api/chat/chat';

const ChatDropDown = () => {
    const navigate = useNavigate();
    const {roomId} = useChatRoomContext();

    const handleExitChatRoom = async () => {
        try{
            await exitChatRoom(roomId);
            alert('채팅방을 나갔습니다.');
            navigate('/chat/list');
        } catch (error) {
            console.error(error);
            alert('채팅방을 나가는데 실패했습니다.')
        }
    }

    return (
        <>
            <li>약속 신청</li>
            <hr />
            <li onClick={()=>{navigate('/chat/list')}}>채팅방 목록</li>
            <hr />
            <li onClick={handleExitChatRoom}>채팅방 나가기</li>
        </>
    );
};

export default ChatDropDown;