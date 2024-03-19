import React, { useRef, useState } from 'react';
import { useWrite } from '../../openapi/orval_query/api/chat/chat';
import { useChatRoom } from './ChatRoomContext';

const ChatInput = () => {
    const { roomId } = useChatRoom();
    const [message, setMessage] = useState('');
    const { mutate: sendMessage, isError, error } = useWrite();
    const inputRef = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(inputRef.current.value);
        if (!message.trim()) return; // 빈 메시지는 전송하지 않음
        sendMessage({ roomId, data: { content: message } }); // 메시지 전송
        setMessage(''); // 입력 필드 초기화
        inputRef.current.value = '';
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input type='입력란' ref={inputRef} />
                <button type="submit">전송</button>
            </form>
            {isError && <p style={{ color: 'red' }}>메시지 전송 실패: {error?.message}</p>}
        </div>
    );
};

export default ChatInput;