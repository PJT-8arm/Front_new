import React from 'react';
import { useRecruitmentDetails } from '../../openapi/orval_query/api/recruitments/recruitments'; 
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const RecruitmentDetail = () => {
  const { id } = useParams();
  const recruitmentId = parseInt(id, 10);

  const { data: detail, isLoading, error } = useRecruitmentDetails(recruitmentId);

  if (isLoading) return <div className="text-center p-4">로딩중...</div>;
  if (error) return <div className="text-center text-red-500 p-4">에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="max-w-xs mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{detail?.recruitmentDto?.title}</h2>
      <p className="mb-2">{detail?.recruitmentDto?.content}</p>
      <p className="text-sm mb-1">모집 날짜: {detail?.recruitmentDto?.recruit_date}</p>
      <p className="text-sm mb-1">장소: {detail?.recruitmentDto?.place}</p>
      <p className="text-sm mb-1">파트너 성별: {detail?.recruitmentDto?.partnerGender}</p>
      <p className="text-sm mb-1">파트너 나이: {detail?.recruitmentDto?.partnerAge}</p>
      <p className="text-sm mb-1">루틴: {detail?.recruitmentDto?.routine}</p>
      <p className="text-sm mb-1">지속 시간: {detail?.recruitmentDto?.duration}</p>
    </div>
  );
};

export default RecruitmentDetail;
