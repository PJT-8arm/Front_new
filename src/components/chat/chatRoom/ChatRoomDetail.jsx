import React, { useEffect, useState } from 'react';
import { modifyChatRoomName, useShowRoom } from '../../../openapi/orval_query/api/chat/chat';
import { useChatRoomContext } from './ChatRoomContext';
import ChatDropDown from './ChatDropDown';

const ChatRoomDetail = () => {
    // useShowRoom 훅 사용. roomId와 쿼리 옵션(필요한 경우)을 전달합니다.
    const { roomId, roomDetail, setRoomDetail } = useChatRoomContext();
    const { data: chatRoomDetail, isLoading, isError, error } = useShowRoom(roomId);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModifying, setIsModifying] = useState(false);

    const handleModifyStart = () => {
        setIsModifying(true);
    };

    const handleNameChange = (event) => {
        if (event.key === "Enter") {
            const newName = event.target.value;
            
            const requestBody = {
                chatRoomName: newName
            };

            modifyChatRoomName(roomId, requestBody).then((response) => {
                setIsModifying(false);
                // setRoomDetail을 사용하여 chatRoomDetail 상태 업데이트
                setRoomDetail(prev => ({ ...prev, chatRoomName: newName }));
            }).catch((error) => {
                console.error("Chat room name update failed", error);
            });
        }
    };

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
        <div className="chat-room-header">
            <div className="chat-room-header-img">
                <img src={chatRoomDetail.imgUrl} alt="Chat Room Avatar" />
            </div>
            <div className='chat-room-box1'>
                <div className="chat-room-info">
                    {isModifying ?
                        (<input
                            type="text"
                            defaultValue={roomDetail.chatRoomName}
                            onKeyPress={handleNameChange}
                        />)
                        : (<strong>{roomDetail.chatRoomName}</strong>)}
                    <div className="text-xs opacity-50">참여자 2명</div>
                </div>
                <div className="chat-room-actions">
                    <div onClick={() => { setShowDropdown(!showDropdown) }} className='action-img'>
                        <img src={showDropdown ? '/src/assets/chevron-up.svg' : '/src/assets/menu.svg'} />
                    </div>
                    {showDropdown && (<ChatDropDown onModify={handleModifyStart} />)}
                </div>
            </div>
        </div>
    );
};

export default ChatRoomDetail;