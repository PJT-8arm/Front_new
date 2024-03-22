import React, { useEffect } from 'react';
import { useShowRoom } from '../../../openapi/orval_query/api/chat/chat';
import { useChatRoomContext } from './ChatRoomContext';

const ChatRoomDetail = () => {
    // useShowRoom 훅 사용. roomId와 쿼리 옵션(필요한 경우)을 전달합니다.
    const { roomId, roomDetail, setRoomDetail } = useChatRoomContext();
    const { data: chatRoomDetail, isLoading, isError, error } = useShowRoom(roomId);


    useEffect(() => {
        if (chatRoomDetail) {
            console.log("ChatRoomDetail:", chatRoomDetail);
            if (chatRoomDetail) setRoomDetail(chatRoomDetail);
        }
    }, [chatRoomDetail]);

    // 로딩 상태 처리
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 에러 상태 처리
    if (isError) {
        // 에러 메시지는 실제 오류 객체에 따라 달라질 수 있습니다.
        // 에러 타입에 따라 적절한 메시지를 렌더링해야 할 수도 있습니다.
        const errorMessage = error.response?.data.message || '채팅방 정보를 불러오는 중 오류 발생';
        return <div>Error: {errorMessage}</div>;
    }

    // chatRoomDetail이 없는 경우 (예를 들어, 데이터가 빈 배열인 경우)
    if (!chatRoomDetail || chatRoomDetail.length === 0) {
        return <div>채팅방 정보가 없습니다.</div>;
    }

    // chatRoomDetail 데이터가 있는 경우, 이를 사용하여 UI 렌더링
    return (
        <div>
            <h2>{chatRoomDetail.chatRoomId}</h2>
            <h2>채팅방 이름 : {chatRoomDetail.chatRoomName}</h2>
            {/* chatRoomDetail 객체의 구조에 따라 적절하게 접근하고 렌더링합니다. */}
            {/* 예: chatRoomDetail.description 등 */}
        </div>
    );
};

export default ChatRoomDetail;