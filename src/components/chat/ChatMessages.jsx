import React, { useEffect, useRef, useState } from 'react';
import { useShowMessages, useShowMessagesInfinite } from '../../openapi/orval_query/api/chat/chat';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useChatRoomContext } from './ChatRoomContext';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAuth } from '../signUp/AuthContext';
import ChatRoomDetail from './ChatRoomDetail';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const ChatMessages = () => {
  const { user } = useAuth();
  const [lastId, setLastId] = useState(null);
  const { roomId, roomDetail } = useChatRoomContext();
  const { data, isLoading, isError, error, refetch } = useShowMessages(roomId, { lastId }, {});
  const [isNewMessage, setIsNewMessage] = useState(false);
  const scrollableDivRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [hasNext, setHasNext] = useState(true);

  function initializeWebSocketConnection(roomId) {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);

      stompClient.subscribe(`/topic/chat/room/${roomId}/message`, function (response) {
        const parsedBody = JSON.parse(response.body);
        const newMessage = parsedBody.message;
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      });
    });
  }

  const loadMessage = async () => {
    if (!hasNext || isLoading) return;
    const currentScrollPosition = -scrollableDivRef.current.scrollTop;
    const scrollHeightBeforeLoad = scrollableDivRef.current.scrollHeight;
    const newLastId = messages.length > 0 ? messages[messages.length - 1].id : null;

    setLastId(newLastId); //lastId가 변경되면 useShowMessage가 실행됨

    const scrollHeightAfterLoad = scrollableDivRef.current.scrollHeight;
    const newScrollPosition = currentScrollPosition + (scrollHeightAfterLoad - scrollHeightBeforeLoad);
    scrollableDivRef.current.scrollTop = newScrollPosition;
  };

  const handleNewMessage = async (message) => {
    // 채팅 창의 맨 아래인지 확인
    const isAtBottom = scrollableDivRef.current.scrollHeight - scrollableDivRef.current.scrollTop === scrollableDivRef.current.clientHeight;

    setMessages((prevMessages) => [...prevMessages, message]);

    if (isAtBottom) {
      scrollToBottom();
    } else {
      setIsNewMessage(true);
    }
  };

  // 새 메시지 알림 클릭 시 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    setIsNewMessage(false); // 알림 상태를 초기화
  };

  // imgUrls의 변경을 감지하여 컴포넌트를 업데이트 합니다.
  useEffect(() => {
    initializeWebSocketConnection(roomId);

  }, [roomId]);

  //fetch가 발생해 data가 변경된 경우 Message를 업데이트하고, 더 가져올 데이터가 있는지 확인
  useEffect(() => {
    if (data?.content) {
      const loadedMessages = data.content;
      
      if (lastId == null && messages.length > 0) {
        return;
      } else {
        const targetId = lastId - 1;
        const exists = messages.some(message => message.id === targetId);
        if (exists) return;
      }
      
      setMessages((prevMessages) => [...prevMessages, ...loadedMessages]);
      setHasNext(!data.last);
    }
  }, [data]);

  if (isLoading) return <div>Loading...1</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!user || !roomDetail) {
    // user 정보가 아직 준비되지 않았다면 로딩 표시나 다른 대체 컨텐츠를 렌더링
    return <div>Loading user information...</div>;
  }

  return (
    <div
      id="scrollableDiv"
      ref={scrollableDivRef}
      style={{
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      {isNewMessage && (
        <button onClick={scrollToBottom} style={{ /* 스타일링 코드 */ }}>
          New messages
        </button>
      )}
      <InfiniteScroll
        dataLength={messages.length} // content 배열의 길이를 사용
        next={loadMessage} // 다음 페이지 로딩 함수
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        inverse={true}
        hasMore={hasNext} // 더 로딩할 페이지가 있는지 여부
        loader={<h4>Loading...2</h4>}
        endMessage={<p style={{ textAlign: 'center' }}>You have seen all messages</p>}
        scrollableTarget="scrollableDiv"
        scrollThreshold="200px"
      >
        {messages.map((message) => (
          <div key={message.id} className={`chat ${message.senderId === user.id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Chat avatar" src={`${message.senderId === user.id ? user.imgUrl : roomDetail.imgUrl}`} />
              </div>
            </div>
            <div className="chat-header">
              {message.id} {message.writerName}
            </div>
            <div className="chat-bubble">{message.content}</div>
            <div className='chat-footer'>
              <time className="text-xs opacity-50">{formatDistanceToNow(new Date(message.createDate), { addSuffix: true, locale: ko },)}</time>
            </div>
          </div>
        ))}

      </InfiniteScroll>

    </div>
  );
};


export default ChatMessages;