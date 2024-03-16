import React, { useState } from 'react';

const ChatMessages = ({ roomId }) => {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const [hasMore, setHasMore] = useState(true); // 더 로드할 메시지가 있는지 여부

    // 메시지를 로드하는 함수
    const loadMessages = async () => {
        if (!hasMore) return; // 더 이상 로드할 메시지가 없으면 요청하지 않음
        try {
            const response = await axios.get(`/${roomId}/messages`, {
                params: { page, size: 30 }, // 페이지와 사이즈 설정
            });
            setMessages(prevMessages => [...prevMessages, ...response.data.content]); // 새 메시지를 기존 메시지에 추가
            setPage(prevPage => prevPage + 1); // 페이지 번호 증가
            setHasMore(!response.data.last); // 마지막 페이지인지 여부에 따라 hasMore 업데이트
        } catch (error) {
            console.error(error);
        }
    };

    // 스크롤 이벤트 핸들러
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 스크롤이 상단에 도달하면 추가 메시지 로드
            if (scrollTop === 0 && hasMore) {
                loadMessages();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    }, []); // 의존성 배열을 비워서 컴포넌트 마운트 시에만 이벤트 리스너 등록

    // 컴포넌트 마운트 시 첫 페이지의 메시지 로드
    useEffect(() => {
        loadMessages();
    }, []);

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    {message.content} {/* 메시지 내용 출력 */}
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;