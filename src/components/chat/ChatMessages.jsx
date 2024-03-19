import React from 'react';
import { useShowMessages, useShowMessagesInfinite } from '../../openapi/orval_query/api/chat/chat';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useChatRoom } from './ChatRoomContext';

const myId = 1; //TODO context user.id 로 수정

const ChatMessages = () => {
  const { roomId, lastMessageId } = useChatRoom();
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
  } = useShowMessagesInfinite(roomId,
    { lastId: lastMessageId },
    {
      query: {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.last === true) {
            return undefined;
          }
          const nextPageNumber = allPages.length;
          return nextPageNumber;
        },
      },
    });

  if (isLoading) return <div>Loading...1</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div
      id="scrollableDiv"
      style={{
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      <InfiniteScroll
        dataLength={data?.pages.reduce((acc, page) => acc + page.content.length, 0) || 0} // content 배열의 길이를 사용
        next={fetchNextPage} // 다음 페이지 로딩 함수
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        inverse={true}
        hasMore={!!hasNextPage} // 더 로딩할 페이지가 있는지 여부
        loader={<h4>Loading...2</h4>}
        endMessage={<p style={{ textAlign: 'center' }}>You have seen all messages</p>}
        scrollableTarget="scrollableDiv"
      >
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.content.map((message) => (
              <div key={message.id} className={`chat ${message.senderId === myId ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Chat avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div className="chat-header">
                  {message.writerName}
                </div>
                <div className="chat-bubble">{message.content}</div>
                <div className='chat-footer'>
                  <time className="text-xs opacity-50">{message.createDate}</time>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
};


export default ChatMessages;