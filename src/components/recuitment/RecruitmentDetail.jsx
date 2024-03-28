import React from 'react';
import { useRecruitmentDetails } from '../../openapi/orval_query/api/recruitments/recruitments'; 
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaUserAlt, FaBirthdayCake, FaVenusMars, FaWeightHanging } from 'react-icons/fa';
import { MdPlace, MdSchedule } from 'react-icons/md';
import CreateAppointmentButton from '../appointment/CreateAppointmentButton';

const RecruitmentDetail = () => {
  const { id } = useParams();
  const recruitmentId = parseInt(id, 10);

  const { data: detail, isLoading, error } = useRecruitmentDetails(recruitmentId);

  // 약속 생성을 위한 함수
  const handleCreateAppointment = async () => {
    if (!detail) return; // 데이터가 없을 때 함수 종료
    // 약속 생성 로직 추가
    console.log('약속을 생성합니다.');
  };

  if (isLoading) return <div className="flex justify-center items-center p-4">로딩중...</div>;
  if (error) return <div className="alert alert-error shadow-lg text-center p-4"><div>{error.message}</div></div>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-base-100 shadow-2xl rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">{detail?.recruitmentDto?.title}</h2>
        <p className="mb-4">{detail?.recruitmentDto?.content}</p>
        <div className="text-sm mb-4 space-y-2">
          <p className="flex items-center"><MdSchedule className="mr-2"/>모집 날짜: <span className="font-semibold ml-1">{detail?.recruitmentDto?.recruit_date}</span></p>
          <p className="flex items-center"><MdPlace className="mr-2"/>장소: <span className="font-semibold ml-1">{detail?.recruitmentDto?.place}</span></p>
          <p className="flex items-center"><FaVenusMars className="mr-2"/>파트너 성별: <span className="font-semibold ml-1">{detail?.recruitmentDto?.partnerGender}</span></p>
          <p className="flex items-center"><FaBirthdayCake className="mr-2"/>파트너 나이: <span className="font-semibold ml-1">{detail?.recruitmentDto?.partnerAge}</span></p>
          <p className="flex items-center"><FaUserAlt className="mr-2"/>루틴: <span className="font-semibold ml-1">{detail?.recruitmentDto?.routine}</span></p>
          <p className="flex items-center"><FaWeightHanging className="mr-2"/>지속 시간: <span className="font-semibold ml-1">{detail?.recruitmentDto?.duration}</span></p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">회원 정보</h3>
        <div className="flex items-center">
          {detail?.memberInfoDto?.imgUrl && (
            <img src={detail.memberInfoDto.imgUrl} alt="Profile" className="w-20 h-20 rounded-full mr-4 shadow-lg" />
          )}
          <div>
            <p className="flex items-center"><FaUserAlt className="mr-2"/>이름: <span className="font-semibold ml-1">{detail?.memberInfoDto?.name}</span></p>
            <p className="flex items-center"><FaUserAlt className="mr-2"/>장소: <span className="font-semibold ml-1">{detail?.memberInfoDto?.address}</span></p>
          </div>
        </div>
      </div>


      <div>
        <h3 className="text-xl font-bold mb-2">프로필 정보</h3>
        <p className="flex items-center"><FaBirthdayCake className="mr-2"/>나이: <span className="font-semibold ml-1">{detail?.profileDto?.age}</span></p>
        <p className="flex items-center"><FaVenusMars className="mr-2"/>성별: <span className="font-semibold ml-1">{detail?.profileDto?.gender}</span></p>
        <p className="flex items-center"><FaWeightHanging className="mr-2"/>벤치프레스: <span className="font-semibold ml-1">{detail?.profileDto?.benchPress}</span></p>
        <p className="flex items-center"><FaWeightHanging className="mr-2"/>데드리프트: <span className="font-semibold ml-1">{detail?.profileDto?.deadLift}</span></p>
        <p className="flex items-center"><FaWeightHanging className="mr-2"/>스쿼트: <span className="font-semibold ml-1">{detail?.profileDto?.squat}</span></p>
      </div>
      {/* 약속 생성 버튼 */}
      <CreateAppointmentButton handleCreateAppointment={handleCreateAppointment} />
    </div>
  );
};

export default RecruitmentDetail;
