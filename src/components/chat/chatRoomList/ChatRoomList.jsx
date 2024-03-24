import React, { useEffect, useState } from 'react';
import { useShowList2 } from '../../../openapi/orval_query/api/chat/chat';
import './ChatRoomList.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../signUp/AuthContext';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatRoomList = () => {
    const { data, isLoading, isError, error, refetch } = useShowList2();
    const navigate = useNavigate();
    const { user } = useAuth();
    const list = useState();

    const handleNewMessage = () => {
        refetch();
      };
    

    function initializeWebSocketConnection() {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, frame => {
            console.log('Connected: ' + frame);

            stompClient.subscribe(`/topic/chat/room/list/${user.id}/message`, function (response) {
                handleNewMessage();
            });
        });
    }

    // 날짜를 MM/DD 형식으로 포맷하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 처리
        const day = String(date.getDate()).padStart(2, '0');
        let hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // 24시간 형식으로 시간을 표시하고, 한 자릿수 시간에는 0을 붙이지 않음
        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;

        return formattedTime;
    };

    // 채팅방을 클릭했을 때 호출되는 함수
    const handleRoomClick = (roomId) => {
        navigate(`/chat/room/${roomId}`); // 해당 roomId를 가진 URL로 이동
    };

    useEffect(() => {
        initializeWebSocketConnection();
    }, [])

    return (
        <>
            {data && data.map((chatRoom) => (
                <div className='card bg-base-100 shadow-xl chat-list-container' key={chatRoom.chatRoomId} onClick={() => handleRoomClick(chatRoom.chatRoomId)}>
                    <div className="chat-list-img">
                        <img src={chatRoom.imgUrl} alt="채팅방 이미지" />
                    </div>
                    <div>{chatRoom.unreadMessagesCount}</div>
                    <div>
                        <div className='chat-list-name-date'>
                            <div className="font-bold">{chatRoom.chatRoomName}</div>
                            <strong className="chat-room-message-date">
                                {formatDate(chatRoom.lastMessageDate)}
                            </strong>
                        </div>
                        <div className="chat-room-message-content">
                            {chatRoom.lastMessageContent}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};


export default ChatRoomList;