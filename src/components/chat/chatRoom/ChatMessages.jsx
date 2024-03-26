import React, { useEffect, useRef, useState } from 'react';
import { useShowMessages } from '../../../openapi/orval_query/api/chat/chat';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useChatRoomContext } from './ChatRoomContext';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAuth } from '../../signUp/AuthContext';
import ChatRoomDetail from './ChatRoomDetail';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './ChatRoom.css';


const ChatMessages = () => {
  const { user } = useAuth();
  const [lastId, setLastId] = useState(null);
  const { roomId, roomDetail } = useChatRoomContext();
  const { data, isError, error, refetch } = useShowMessages(roomId, { lastId }, {});
  const [isNewMessage, setIsNewMessage] = useState(false);
  const scrollableDivRef = useRef(null);
  const [receptedMessage, setReceptedMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  function initializeWebSocketConnection(roomId) {
    const socket = new SockJS('http://api.arm.genj.me/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);

      stompClient.subscribe(`/topic/chat/room/${roomId}/message`, function (response) {
        const parsedBody = JSON.parse(response.body);
        const newMessage = parsedBody.message;
        console.log(messages);
        handleNewMessage(newMessage);
      });
    });
  }

  const loadMessage = async () => {
    if (!hasNext) return;
    if (scrollableDivRef) setScrollTop(scrollableDivRef.current.scrollTop);
    const newLastId = messages.length > 0 ? messages[messages.length - 1].id : null;
    setLastId(newLastId); //lastId가 변경되면 useShowMessage가 실행됨
  };

  //스톰프 메세지 처리
  const handleNewMessage = (newMessage) => {
    const isAtBottom = scrollableDivRef.current.scrollTop === 0;

    setMessages((prevMessages) => {
      if (prevMessages[0] && prevMessages[0].id === newMessage.id) {
        return prevMessages; // 메시지가 이미 있으면 상태를 변경하지 않습니다.
      }

      return [newMessage, ...prevMessages]; // 최신 메시지를 추가합니다.
    });

    if (isAtBottom) {
      scrollToBottom();
    } else {
      setIsNewMessage(true);
    }

    setReceptedMessage(true);
  };

  // 새 메시지 알림 클릭 시 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    scrollableDivRef.current.scrollTop = 0;
    setIsNewMessage(false); // 알림 상태를 초기화
  };

  useEffect(() => {
    //메세지 길이 변경 시 스크롤 위치 조정
    if (!scrollableDivRef) return;

    if (receptedMessage) {
      setReceptedMessage(false);
      return;
    }

    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollTop;
    }
  }, [messages?.length]);

  // imgUrls의 변경을 감지하여 컴포넌트를 업데이트 합니다.
  useEffect(() => {
    console.log('useEffect');
    initializeWebSocketConnection(roomId);
  }, []);

  useEffect(() => {
    if (!data) return;
    console.log('messages', messages);
    console.log('data', data);
    if (data?.content) {
      const loadedMessages = data.content;

      if (lastId == null && messages.length > 0) {
        return;
      } else {
        const targetId = data.content[0].id;
        const exists = messages.some(message => message.id === targetId);
        if (exists) return;
      }

      setMessages((prevMessages) => [...prevMessages, ...loadedMessages]);
      setHasNext(!data.last);
    }
  }, [data]);



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
        <div role="alert" className="alert shadow-lg alert-fixed-bottom" onClick={scrollToBottom}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
            <h3 className="font-bold">New message!</h3>
            <div className="text-xs">You have 1 unread message</div>
          </div>
          <button className="btn btn-sm">See</button>
        </div>
      )}
      <InfiniteScroll
        dataLength={messages.length} // content 배열의 길이를 사용
        next={loadMessage} // 다음 페이지 로딩 함수
        style={{ display: 'flex', flexDirection: 'column-reverse', flexGrow: 1}}
        inverse={true}
        hasMore={hasNext} // 더 로딩할 페이지가 있는지 여부
        loader={<h4>Loading...2</h4>}
        endMessage={<p style={{ textAlign: 'center', color: 'darkgray', fontWeight: 'bold' }}>마지막 메세지입니다.</p>}
        scrollableTarget="scrollableDiv"
      >
        {messages.map((message, index) => (
          <div key={index} className={`chat ${message.senderId === user.id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Chat avatar" src={`${message.senderId === user.id ? user.imgUrl : roomDetail.imgUrl}`} />
              </div>
            </div>
            <div className="chat-header">
              {message.writerName}
            </div>
            <pre className="chat-bubble">{message.content}</pre>
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
