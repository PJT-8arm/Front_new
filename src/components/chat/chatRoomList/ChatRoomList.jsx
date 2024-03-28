import React, { useEffect, useRef, useState } from 'react';
import { useShowList2, updateLastViewId } from '../../../openapi/orval_query/api/chat/chat';
import './ChatRoomList.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../signUp/AuthContext';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import useExitChatRoom from '../hooks/useExitChatRoom';

const ChatRoomList = () => {
    const { data, isLoading, isError, error, refetch } = useShowList2();
    const navigate = useNavigate();
    const { user } = useAuth();
    const list = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
    const { handleExitChatRoom } = useExitChatRoom();
    const [chatRooms, setChatRooms] = useState([]);
    const stompClientRef = useRef(null);

    const handleNewMessage = () => {
        refetch();
    };

    function initializeWebSocketConnection() {
        if (!user) return null
        const socket = new SockJS('https://api.arm.genj.me/ws');
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;
        stompClient.connect({}, frame => {
            console.log('Connected: ' + frame);
            console.log(user.id);
            stompClient.subscribe(`/topic/chat/room/list/${user.id}/message`, function (response) {
                handleNewMessage();
            });
        });

        return stompClient;
    }

    // 우클릭 이벤트 핸들러
    const handleContextMenu = (e, chatRoomId) => {
        e.preventDefault(); // 기본 컨텍스트 메뉴를 방지
        setShowDropdown(true); // 드롭다운을 표시
        setDropdownPosition({ x: e.pageX, y: e.pageY }); // 드롭다운 위치 설정
    };

    const handleDropdownItemClick = (e, action, chatRoomId) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        // 여기서 action에 따라 다른 작업 수행
        if (action === 'exit') {
            handleExitChatRoom(chatRoomId);
        }
        setShowDropdown(false); // 드롭다운 숨김
    };

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
    const handleRoomClick = async (roomId) => {
        updateLastViewId(roomId);
        navigate(`/chat/room/${roomId}`); // 해당 roomId를 가진 URL로 이동
    };

    useEffect(() => {
        const stompClient = initializeWebSocketConnection();

        // 클린업 함수
        return () => {
            // 컴포넌트가 언마운트되기 직전에 연결 종료
            if (stompClient && stompClient.connected) {
                console.log('client',stompClient)
                stompClient.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        };
    }, [])

    useEffect(() => {
        if (data) {
            setChatRooms(data);
        }
    }, [data]);

    if (!user) {
        return <h2 className='chat-list-none'>로그인 후 이용 가능합니다.</h2>;
    }

    return (
        <>
            {(chatRooms == null || chatRooms.length === 0) && <h2 className='chat-list-none'>채팅 내역이 없습니다.</h2>}
            {chatRooms && chatRooms.map((chatRoom) => (
                <div className='chat-list-container card bg-base-100 shadow-xl'
                    key={chatRoom.chatRoomId}
                    onClick={() => handleRoomClick(chatRoom.chatRoomId)}
                    onContextMenu={(e) => handleContextMenu(e, chatRoom.chatRoomId)}
                >
                    <div className='chat-list-item-inside'>
                        <div className='chat-list-img-count'>
                            <div className="chat-list-img">
                                <img src={chatRoom.imgUrl} alt="채팅방 이미지" />
                            </div>
                            <div>
                                <div className='chat-list-unreadCount'>{chatRoom.unreadMessagesCount > 100 ? '100+' : chatRoom.unreadMessagesCount}</div>
                            </div>
                        </div>
                        <div className='chat-list-name-date-container'>
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
                </div>
            ))}
        </>
    );
};


export default ChatRoomList;