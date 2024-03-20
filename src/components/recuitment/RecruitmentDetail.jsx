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
    <div className="max-w-xs mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">{detail?.recruitmentDto?.title}</h2>
      <p className="mb-4">{detail?.recruitmentDto?.content}</p>
      <div className="text-sm mb-4">
        <p className="mb-1">모집 날짜: <span className="font-semibold">{detail?.recruitmentDto?.recruit_date}</span></p>
        <p className="mb-1">장소: <span className="font-semibold">{detail?.recruitmentDto?.place}</span></p>
        <p className="mb-1">파트너 성별: <span className="font-semibold">{detail?.recruitmentDto?.partnerGender}</span></p>
        <p className="mb-1">파트너 나이: <span className="font-semibold">{detail?.recruitmentDto?.partnerAge}</span></p>
        <p className="mb-1">루틴: <span className="font-semibold">{detail?.recruitmentDto?.routine}</span></p>
        <p className="mb-1">지속 시간: <span className="font-semibold">{detail?.recruitmentDto?.duration}</span></p>
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        지원하기
      </button>
    </div>
  );
};

export default RecruitmentDetail;
