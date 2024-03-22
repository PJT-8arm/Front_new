import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css'

function Home() {

  const [recruitmentData, setRecruitmentData] = useState([]);

  useEffect(() => {
    // recruitmentList API 호출
    const fetchRecruitmentData = async () => {
      try {
        const response = await axios.get('/api/recruitments/list');
        setRecruitmentData(response.data);
        // console.log('Recruitment Data:', response.data); // 데이터 로그 출력
      } catch (error) {
        console.error('Error fetching recruitment data:', error);
      }
    };

    fetchRecruitmentData(); // 컴포넌트가 마운트될 때 API 호출
  }, []); // useEffect가 한 번만 실행되도록 빈 배열을 두 번째 인수로 전달

  if (recruitmentData.length === 0) return <div>로딩중...</div>;
  
 // 날짜 형식 변환 함수
 const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  return (
    <div>
      <ul>
        {/* recruitmentData를 반복하여 각 아이템을 표시합니다. */}
        {recruitmentData.map((item, index) => (
          <li key={index}>
            <div>
                <div style={{ display: 'flex' , justifyContent: 'center' }}>
                    <div className="card w-90 bg-base-100 shadow-xl">
                            <div className="cardbody">
                                <div className="avatar">
                                    <img src={item.member.imgUrl} className="rounded-full" alt="avatar" />
                                </div>
                                <div className='content'>
                                    <div className="badge badge-primary">
                                        <p className='nickname'>{item.member.nickname}</p>
                                    </div>                                   
                                    <h2 className="title">{item.title}</h2>
                                    <div className='tag'>
                                        <p className='tag-list'>{'#'+ item.partnerAge}</p>
                                        <p className='tag-list'>{'#'+ item.partnerGender}</p>
                                    </div>
                                    <p className='date'>{formatDate(item.recruit_date)}</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
