import React from 'react';
import { useShowMessages, useShowMessagesInfinite } from '../../openapi/orval_query/api/chat/chat';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useChatRoom } from './ChatRoomContext';

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
     {lastId: lastMessageId},
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
    <InfiniteScroll
      dataLength={data?.pages.reduce((acc, page) => acc + page.content.length, 0) || 0} // content 배열의 길이를 사용
      next={fetchNextPage} // 다음 페이지 로딩 함수
      hasMore={!!hasNextPage} // 더 로딩할 페이지가 있는지 여부
      loader={<h4>Loading...2</h4>}
      endMessage={<p style={{ textAlign: 'center' }}>You have seen all messages</p>}
    >
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.content.map((message) => (
            <div key={message.id}>{message.content}</div> // 메시지 내용을 표시
          ))}
        </React.Fragment>
      ))}
    </InfiniteScroll>
  );
};


export default ChatMessages;