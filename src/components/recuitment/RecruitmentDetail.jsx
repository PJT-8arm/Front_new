import React from 'react';
import { useRecruitmentDetails } from '../../openapi/orval_query/api/recruitments/recruitments'; 
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const RecruitmentDetail = () => {
  const { id } = useParams();
  const recruitmentId = parseInt(id, 10); // URL 파라미터에서 받은 id를 정수로 변환

  // useRecruitmentDetails 훅을 사용하여 데이터를 불러옵니다.
  const { data: detail, isLoading, error } = useRecruitmentDetails(recruitmentId);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div>
      <h2>{detail?.recruitmentDto?.title}</h2>
      <p>{detail?.recruitmentDto?.content}</p>
      <p>모집 날짜: {detail?.recruitmentDto?.recruit_date}</p>
      <p>장소: {detail?.recruitmentDto?.place}</p>
      <p>파트너 성별: {detail?.recruitmentDto?.partnerGender}</p>
      <p>파트너 나이: {detail?.recruitmentDto?.partnerAge}</p>
      <p>루틴: {detail?.recruitmentDto?.routine}</p>
      <p>지속 시간: {detail?.recruitmentDto?.duration}</p>
    </div>
  );
};

export default RecruitmentDetail;
