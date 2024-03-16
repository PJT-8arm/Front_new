import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomDetail from './ChatRoomDetail';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatRoom = () => {
    const { roomId } = useParams();
    console.log({roomId});

    return (
        <div>
            <ChatRoomDetail roomId={roomId} />
            <ChatMessages roomId={roomId} />
            <ChatInput roomId={roomId} />
        </div>
    );
};

export default ChatRoom;