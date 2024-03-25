// useExitChatRoom.js
import { useNavigate } from 'react-router-dom';
import { modifyChatRoomName } from '../../../openapi/orval_query/api/chat/chat';

const useModifyRoom = () => {

    const handleModifyChatRoom = async (roomId) => {
        try {
            await modifyChatRoomName(roomId);
        } catch (error) {
            console.error(error);
        }
    };

    return handleModifyChatRoom;
};

export default useModifyRoom;