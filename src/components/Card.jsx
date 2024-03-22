import React from 'react';

const Card = ({ item, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  const handleClick = () => {
    onClick(item.id); // 클릭 이벤트 발생 시 onClick 함수 호출하여 아이템 ID 전달
  };

  return (
    <div className="card w-90 bg-base-100 shadow-xl" onClick={handleClick}>
      <div className="cardbody">
        <div className="avatar">
          <img src={item.memberInfoDto.imgUrl} className="rounded-full" alt="avatar" />
        </div>
        <div className='content'>
          <div className="badge badge-primary">
            <p className='nickname'>{item.memberInfoDto.nickname}</p>
          </div>
          <h2 className="title">{item.recruitmentDto.title}</h2>
          <div className='tag'>
            <p className='tag-list'>{'#' + item.recruitmentDto.partnerAge}</p>
            <p className='tag-list'>{'#' + item.recruitmentDto.partnerGender}</p>
            <p className='tag-list'>{'#' + item.recruitmentDto.place}</p>
            <p className='tag-list'>{'#' + item.recruitmentDto.routine}</p>
          </div>
          <p className='date'>{formatDate(item.recruitmentDto.recruit_date)}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
