import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // useParams 훅을 임포트합니다.

const RecruitmentDetail = () => {
  const [detail, setDetail] = useState(null);
  const { id } = useParams(); // useParams 훅을 사용하여 URL 파라미터에서 id를 가져옵니다.

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recruitments/list/${id}`);
        setDetail(response.data);
      } catch (error) {
        console.error("상세 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchDetail();
  }, [id]); // 의존성 배열에 id를 넣어주어 id 값이 변경될 때마다 useEffect가 실행되도록 합니다.

  if (!detail) return <div>로딩중...</div>;

  return (
    <div>
      <h2>{detail.title}</h2>
      <p>{detail.content}</p>
      <p>모집 날짜: {detail.recruit_date}</p>
      <p>장소: {detail.place}</p>
      <p>파트너 성별: {detail.partnerGender}</p>
      <p>파트너 나이: {detail.partnerAge}</p>
      <p>루틴: {detail.routine}</p>
      <p>지속 시간: {detail.duration}</p>
    </div>
  );
};

export default RecruitmentDetail;
