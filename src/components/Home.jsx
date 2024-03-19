import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  
  return (
    <div>
      <h1>8Arm</h1>
      <ul>
        {/* recruitmentData를 반복하여 각 아이템을 표시합니다. */}
        {recruitmentData.map((item, index) => (
          <li key={index}>

            <div>
                <div>
                    <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                            <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                            </div>
                            <h2 className="card-title">오늘 저녁 같이 운동 하실 분</h2>
                            <p>Title : {item.title}</p>
                            <p>Member: {item.member.nickname}</p>
                            <p>Partner Age: {item.partnerAge}</p>
                            <p>Partner Gender: {item.partnerGender}</p>
                            <p>Recruit Date: {item.recruit_date}</p>
                            <p>Routine: {item.routine}</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">모집글 보기</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
          </li>
          // 예시: item.title은 실제 데이터 구조에 따라 변경될 수 있습니다.
        ))}
      </ul>
    </div>
  );
}

export default Home;
