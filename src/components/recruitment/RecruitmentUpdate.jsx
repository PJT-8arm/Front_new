import React, { useState, useEffect } from 'react';
import { useRecruitmentDetails } from '../../openapi/orval_query/api/recruitments/recruitments';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserAlt, FaBirthdayCake, FaVenusMars, FaWeightHanging, FaEllipsisV } from 'react-icons/fa';
import { MdPlace, MdSchedule } from 'react-icons/md';
import './RecruitmentDetail.css';
import { axiosInstance } from '../../utils/axiosInstance';
import CreateAppointmentButton from '../appointment/CreateAppointmentButton';

// 모집 정보를 업데이트하는 함수
const updateRecruitment = async (recruitmentId, formData) => {
    try {
      const response = await axiosInstance({
        url: `/api/recruitments/update/${recruitmentId}`,
        method: 'put',
        data: formData
      });
      return response.data;
    } catch (error) {
      console.error('모집 정보를 업데이트하는데 실패했습니다:', error);
      throw new Error('모집 정보를 업데이트하는데 실패했습니다. 다시 시도해주세요.');
    }
  };
  

const RecruitmentUpdate = () => {
  const { id } = useParams();
  const recruitmentId = parseInt(id, 10);
  const navigate = useNavigate();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    recruit_date: '',
    place: '',
    partnerGender: '',
    partnerAge: '',
    routine: '',
    duration: ''
  });

  const { data: detail, isLoading, error } = useRecruitmentDetails(recruitmentId);

  useEffect(() => {
    if (detail) {
      setFormData({
        title: detail.recruitmentDto.title,
        content: detail.recruitmentDto.content,
        recruit_date: detail.recruitmentDto.recruit_date,
        place: detail.recruitmentDto.place,
        partnerGender: detail.recruitmentDto.partnerGender,
        partnerAge: detail.recruitmentDto.partnerAge,
        routine: detail.recruitmentDto.routine,
        duration: detail.recruitmentDto.duration
      });
    }
  }, [detail]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecruitment(recruitmentId, formData); // 업데이트 함수 호출
      navigate(`/recruitments/detail/${recruitmentId}`);
    } catch (error) {
      console.error('모집 정보 수정 실패:', error);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center p-4">로딩중...</div>;
  if (error) return <div className="alert alert-error shadow-lg text-center p-4"><div>{error.message}</div></div>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-base-100 shadow-2xl rounded-lg">
      {/* Flex 컨테이너: 제목과 "더 보기" 메뉴 버튼 */}
      <div className="flex justify-between items-center mb-6">
        {/* 제목 */}
        <h2 className="text-2xl font-bold pb-1">{detail?.recruitmentDto?.title}</h2>
        {/* "더 보기" 메뉴 버튼 */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="recruit_date" className="block text-sm font-medium text-gray-700">모집 날짜</label>
          <input type="datetime-local" id="recruit_date" name="recruit_date" value={formData.recruit_date} onChange={handleChange} required className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="place" className="block text-sm font-medium text-gray-700">장소</label>
          <input type="text" id="place" name="place" value={formData.place} onChange={handleChange} required className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="partnerGender" className="block text-sm font-medium text-gray-700">파트너 성별</label>
          <input type="text" id="partnerGender" name="partnerGender" value={formData.partnerGender} onChange={handleChange} required className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="partnerAge" className="block text-sm font-medium text-gray-700">파트너 나이</label>
          <input type="number" id="partnerAge" name="partnerAge" value={formData.partnerAge} onChange={handleChange} required className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="routine" className="block text-sm font-medium text-gray-700">루틴</label>
          <input type="text" id="routine" name="routine" value={formData.routine} onChange={handleChange} required className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">지속 시간</label>
          <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} required className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <button type="submit" className="btn">수정 완료</button>
      </form>
    </div>
  );
};

export default RecruitmentUpdate;
