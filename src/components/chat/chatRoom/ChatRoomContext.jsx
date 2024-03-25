import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../../signUp/AuthContext';

// 채팅방 데이터를 위한 Context 생성
const ChatRoomContext = createContext();

// Context 데이터를 업데이트하고 자식 컴포넌트에 전달할 Provider 컴포넌트
export const ChatRoomProvider = ({ children, initialRoomId }) => {
    console.log(initialRoomId);
    const [roomId, setRoomId] = useState(initialRoomId);
    const [roomDetail, setRoomDetail] = useState({});
    

    return (
        <ChatRoomContext.Provider value={{roomId, roomDetail, setRoomDetail}}>
            {children}
        </ChatRoomContext.Provider>
    );
};


// Context를 사용하기 위한 custom hook
export const useChatRoomContext = () => useContext(ChatRoomContext);