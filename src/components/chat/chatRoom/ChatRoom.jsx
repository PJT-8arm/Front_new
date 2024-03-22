import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomDetail from './ChatRoomDetail';
import ChatInput from './ChatInput';
import { ChatRoomProvider } from './ChatRoomContext';
import ChatMessages from './ChatMessages';
import './ChatRoom.css';

const ChatRoom = () => {
    const { roomId } = useParams();
    console.log({ roomId });

    return (
        <div className="chatRoomContainer">
            <ChatRoomProvider initialRoomId={roomId}>
                <div className="chatRoomDetail">
                    <ChatRoomDetail />
                </div>
                <div className="chatMessages">
                    <ChatMessages />
                </div>
                <div className="chatInput">
                    <ChatInput />
                </div>
            </ChatRoomProvider>
        </div>
    );
};

export default ChatRoom;