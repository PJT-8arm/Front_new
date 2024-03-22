import React from 'react';
import { useShowList2 } from '../../../openapi/orval_query/api/chat/chat';
import './ChatRoomList.css'
import { useNavigate } from 'react-router-dom';

const ChatRoomList = () => {
    const { data, isLoading, isError, error, refetch } = useShowList2();
    const navigate = useNavigate();

    // 날짜를 MM/DD 형식으로 포맷하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US',
            {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
    };

    // 채팅방을 클릭했을 때 호출되는 함수
    const handleRoomClick = (roomId) => {
        navigate(`/chat/room/${roomId}`); // 해당 roomId를 가진 URL로 이동
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full"> {/* 테이블의 너비를 전체로 설정 */}
                    <tbody> {/* tbody 태그를 추가 */}
                        {data && data.map((chatRoom) => (
                            <tr key={chatRoom.chatRoomId} className="hover" onClick={() => handleRoomClick(chatRoom.chatRoomId)}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={chatRoom.imgUrl} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{chatRoom.chatRoomName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="date-size text-sm opacity-50">
                                        {formatDate(chatRoom.lastMessageDate)}
                                    </div>
                                    <div className="text-ellipsis overflow-hidden max-w-xs whitespace-nowrap">
                                        {chatRoom.lastMessageContent}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default ChatRoomList;