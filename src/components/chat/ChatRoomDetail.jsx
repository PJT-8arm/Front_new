import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useShowRoom } from '../../openapi/orval_query/api/chat/chat';

const ChatRoomDetail = ({ roomId }) => {

    const [chatRoomDetail, setChatRoomDetail] = useState([]);
    

    useEffect(() => {
        console.log(roomId);
        useShowRoom
        axios.get(`/api/chat/room/${roomId}`)
            .then(response => {
                setChatRoomDetail(response.data);
                console.log(response.data);
            })
            .catch(error => {
                // 서버로부터의 응답 메시지가 있는지 확인하고, 있으면 출력합니다.
                if (error.response && error.response.data) {
                    console.error('error.response.data');
                } else {
                    // 응답 메시지가 없는 다른 종류의 에러인 경우, 일반적인 에러 메시지를 출력합니다.
                    console.error('채팅방 정보를 불러오는 중 알 수 없는 오류 발생:', error);
                }
            });
    }, [roomId]); // roomId가 변경될 때마다 요청을 다시 보냅니다.

    if (!chatRoomDetail) {
        return <div>Loading...</div>;
    } else {
        console.log(chatRoomDetail);
    }

    return (
        <div>
            {chatRoomDetail}
        </div>
    );
};

export default ChatRoomDetail;