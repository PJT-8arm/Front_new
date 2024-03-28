import React from 'react';
import { useApplicationDetails } from '../../openapi/orval_query/api/application/application';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaUserAlt, FaBirthdayCake, FaVenusMars, FaWeightHanging } from 'react-icons/fa';
import { MdPlace, MdSchedule } from 'react-icons/md';

const AppointmentDetail = () => {
  const { id } = useParams();
  const appointmentId = parseInt(id, 10);

  const { data: detail, isLoading, error } = useAppointmentDetails(appointmentId);

  if (isLoading) return <div className="flex justify-center items-center p-4">로딩중...</div>;
  if (error) return <div className="alert alert-error shadow-lg text-center p-4"><div>{error.message}</div></div>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-base-100 shadow-2xl rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">{detail?.title}</h2>
        <p className="mb-4">{detail?.content}</p>
        <div className="text-sm mb-4 space-y-2">
          <p className="flex items-center"><MdSchedule className="mr-2"/>모집 날짜: <span className="font-semibold ml-1">{detail?.recruitDate}</span></p>
          <p className="flex items-center"><MdPlace className="mr-2"/>장소: <span className="font-semibold ml-1">{detail?.place}</span></p>
          <p className="flex items-center"><FaVenusMars className="mr-2"/>파트너 성별: <span className="font-semibold ml-1">{detail?.partnerGender}</span></p>
          <p className="flex items-center"><FaBirthdayCake className="mr-2"/>파트너 나이: <span className="font-semibold ml-1">{detail?.partnerAge}</span></p>
          <p className="flex items-center"><FaUserAlt className="mr-2"/>루틴: <span className="font-semibold ml-1">{detail?.routine}</span></p>
          <p className="flex items-center"><FaWeightHanging className="mr-2"/>지속 시간: <span className="font-semibold ml-1">{detail?.duration}</span></p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">회원 정보</h3>
        <div className="flex items-center">
          {detail?.imgUrl && (
            <img src={detail.imgUrl} alt="Profile" className="w-20 h-20 rounded-full mr-4 shadow-lg" />
          )}
          <div>
            <p className="flex items-center"><FaUserAlt className="mr-2"/>이름: <span className="font-semibold ml-1">{detail?.name}</span></p>
            <p className="flex items-center"><FaUserAlt className="mr-2"/>장소: <span className="font-semibold ml-1">{detail?.address}</span></p>
          </div>
        </div>
      </div>


      <div>
        <h3 className="text-xl font-bold mb-2">프로필 정보</h3>
        <p className="flex items-center"><FaBirthdayCake className="mr-2"/>나이: <span className="font-semibold ml-1">{detail?.age}</span></p>
        <p className="flex items-center"><FaVenusMars className="mr-2"/>성별: <span className="font-semibold ml-1">{detail?.gender}</span></p>
        <p className="flex items-center"><FaWeightHanging className="mr-2"/>벤치프레스: <span className="font-semibold ml-1">{detail?.benchPress}</span></p>
        <p className="flex items-center"><FaWeightHanging className="mr-2"/>데드리프트: <span className="font-semibold ml-1">{detail?.deadLift}</span></p>
        <p className="flex items-center"><FaWeightHanging className="mr-2"/>스쿼트: <span className="font-semibold ml-1">{detail?.squat}</span></p>
      </div>
    </div>
  );
};

export default AppointmentDetail;
