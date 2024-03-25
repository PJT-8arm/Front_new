// useExitChatRoom.js
import { useNavigate } from 'react-router-dom';
import { exitChatRoom } from '../../../openapi/orval_query/api/chat/chat';

const useExitChatRoom = () => {
    const navigate = useNavigate();

    const handleExitChatRoom = async (roomId) => {
        try {
            await exitChatRoom(roomId);
            alert('채팅방을 나갔습니다.');
            navigate('/chat/list');
        } catch (error) {
            console.error(error);
            alert('채팅방을 나가는데 실패했습니다.');
        }
    };

    return handleExitChatRoom;
};

export default useExitChatRoom;