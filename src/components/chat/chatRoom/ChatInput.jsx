import React, { useRef, useState } from 'react';
import { useWrite } from '../../../openapi/orval_query/api/chat/chat';
import { useChatRoomContext } from './ChatRoomContext';
import './ChatRoom.css'

const ChatInput = () => {
    const { roomId } = useChatRoomContext();
    const [message, setMessage] = useState('');
    const { mutate: sendMessage, isError, error } = useWrite();
    const inputRef = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        const currentMessage = inputRef.current.value; // 현재 입력 필드의 값을 직접 가져옴
        if (!currentMessage.trim()) return; // 빈 메시지는 전송하지 않음

        sendMessage({ roomId, data: { content: currentMessage } }); // 현재 메시지 전송
        setMessage(''); // 상태 초기화
        inputRef.current.value = ''; // 입력 필드 초기화

        inputRef.current.style.height = 'auto'; // 높이를 auto로 재설정
        
    };

    const adjustTextareaHeight = (e) => {
        inputRef.current.style.height = 'auto'; // 높이를 auto로 설정하여 초기화
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // 실제 내용 높이에 맞게 높이 조정

    };

    //TODO input란을 클릭하면 나머지 버튼이 보이도록 수정
    return (
        <div>
            <form onSubmit={handleSubmit} className='chat-room-input'>
                <textarea
                    className='chat-room-input-text'
                    rows={1}
                    ref={inputRef}
                    onInput={adjustTextareaHeight} // 사용자 입력시 높이 조정
                />
                <button className='chat-room-input-send' type="submit">
                    <img src='/images/send-button.svg' alt='전송버튼' />
                </button>
            </form>
            {isError && <p style={{ color: 'red' }}>메시지 전송 실패: {error?.message}</p>}
        </div>
    );
};

export default ChatInput;