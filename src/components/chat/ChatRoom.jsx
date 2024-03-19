import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomDetail from './ChatRoomDetail';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { ChatRoomProvider } from './ChatRoomContext';

const ChatRoom = () => {
    const { roomId } = useParams();
    console.log({ roomId });

    return (
        <div>
            <ChatRoomProvider initailRoomId={roomId}>
                <ChatRoomDetail/>
                <ChatMessages/>
                <ChatInput/>
            </ChatRoomProvider>
        </div>
    );
};

export default ChatRoom;