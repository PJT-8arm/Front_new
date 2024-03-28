import React, {useState} from 'react';
import { useRecruitmentDetails } from '../../openapi/orval_query/api/recruitments/recruitments';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaUserAlt, FaBirthdayCake, FaVenusMars, FaWeightHanging, FaEllipsisV } from 'react-icons/fa';
import { MdPlace, MdSchedule } from 'react-icons/md';
import './RecruitmentDetail.css';
import { axiosInstance } from '../../utils/axiosInstance';
import CreateAppointmentButton from '../appointment/CreateAppointmentButton';

const RecruitmentDetail = () => {
  const { id } = useParams();
  const recruitmentId = parseInt(id, 10);
  const navigate = useNavigate();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const { data: detail, isLoading, error } = useRecruitmentDetails(recruitmentId);


  const handleMakeChatRoom = async (name) => {
    const roomId = await axiosInstance({
      url: `api/chat/room/make/${name}`, // 실제 theirName 값으로 URL을 동적으로 구성
      method: 'get', // 요청 메서드 지정
    });
    console.log(roomId);
    navigate(`/chat/room/${roomId}`); // 해당 roomId를 가진 URL로 이동
  }
  // 약속 생성을 위한 함수
  const handleCreateAppointment = async () => {
    if (!detail) return; // 데이터가 없을 때 함수 종료
    // 약속 생성 로직 추가
    console.log('약속을 생성합니다.');
  };

  const handleEditRecruitment = () => {
    // 모집 글 수정 로직
    console.log('모집 글 수정');
    // 여기에 모집 글을 수정하는 로직을 추가하세요.
  };

<<<<<<< HEAD
  const handleDeleteRecruitment = async (recruitmentId) => {
    // "진짜로 삭제하시겠습니까?" 확인 창 띄우기
    const isConfirmed = window.confirm("진짜로 삭제하시겠습니까?");
    if (isConfirmed) {
      // 사용자가 "네"를 누른 경우, 모집 글 삭제 로직 실행
      try {
        await axiosInstance({
            url: `/api/recruitments/delete/${recruitmentId}`,
            method: 'delete',
        });
  
        console.log('모집 글이 성공적으로 삭제되었습니다.');
        navigate('/'); // 메인 화면으로 돌아가기
      } catch (error) {
        console.error('모집 글 삭제 중 오류가 발생했습니다:', error);
        alert('모집 글을 삭제하는 도중 오류가 발생했습니다. 다시 시도해주세요.'); // 경고창 띄우기
      }
    } else {
      // 사용자가 "아니요"를 누른 경우, 삭제 취소
      console.log('모집 글 삭제가 취소되었습니다.');
    }
  };
  

=======
  const handleDeleteRecruitment = () => {
    // 모집 글 삭제 로직
    console.log('모집 글 삭제');
    // 여기에 모집 글을 삭제하는 로직을 추가하세요.
  };
>>>>>>> a8cb66b16c2ff3a83deb80b57756e7a1a13b6dc8

  if (isLoading) return <div className="flex justify-center items-center p-4">로딩중...</div>;
  if (error) return <div className="alert alert-error shadow-lg text-center p-4"><div>{error.message}</div></div>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-base-100 shadow-2xl rounded-lg">
  {/* Flex 컨테이너: 제목과 "더 보기" 메뉴 버튼 */}
  <div className="flex justify-between items-center mb-6">
    {/* 제목 */}
    <h2 className="text-2xl font-bold pb-1">{detail?.recruitmentDto?.title}</h2>
    {/* "더 보기" 메뉴 버튼 */}
    <button className="more-menu-btn " onClick={() => setShowMoreMenu(!showMoreMenu)}>
      <FaEllipsisV />
    </button>
  </div>

  {/* "더 보기" 메뉴 */}
  {showMoreMenu && (
    <div className="more-menu absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
      <ul>
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleEditRecruitment}>모집 글 수정</li>
<<<<<<< HEAD
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleDeleteRecruitment(recruitmentId)}>모집 글 삭제</li>
=======
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleDeleteRecruitment}>모집 글 삭제</li>
>>>>>>> a8cb66b16c2ff3a83deb80b57756e7a1a13b6dc8
      </ul>
    </div>
  )}

      
      <div className="mb-6">
        <p className="mb-4 border-t pt-4">{detail?.recruitmentDto?.content}</p>
        <div className="text-sm mb-4 space-y-2">
          <p className="flex items-center"><MdSchedule className="mr-2" />모집 날짜: <span className="font-semibold ml-1">{detail?.recruitmentDto?.recruit_date}</span></p>
          <p className="flex items-center"><MdPlace className="mr-2" />장소: <span className="font-semibold ml-1">{detail?.recruitmentDto?.place}</span></p>
          <p className="flex items-center"><FaVenusMars className="mr-2" />파트너 성별: <span className="font-semibold ml-1">{detail?.recruitmentDto?.partnerGender}</span></p>
          <p className="flex items-center"><FaBirthdayCake className="mr-2" />파트너 나이: <span className="font-semibold ml-1">{detail?.recruitmentDto?.partnerAge}</span></p>
          <p className="flex items-center"><FaUserAlt className="mr-2" />루틴: <span className="font-semibold ml-1">{detail?.recruitmentDto?.routine}</span></p>
          <p className="flex items-center"><FaWeightHanging className="mr-2" />지속 시간: <span className="font-semibold ml-1">{detail?.recruitmentDto?.duration}</span></p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">회원 정보</h3>
        <div className="flex items-center">
          {detail?.memberInfoDto?.imgUrl && (
            <img src={detail.memberInfoDto.imgUrl} alt="Profile" className="w-20 h-20 rounded-full mr-4 shadow-lg" />
          )}
          <div className='flex-grow-div'>
            <div className='contain-button'>
              <p className="flex items-center"><FaUserAlt className="mr-2" />이름: <span className="font-semibold ml-1">{detail?.memberInfoDto?.name}</span></p>
              <button className='btn' onClick={() => handleMakeChatRoom(detail.memberInfoDto.name)}> 대화신청 </button>
            </div>
            <p className="flex items-center"><FaUserAlt className="mr-2" />장소: <span className="font-semibold ml-1">{detail?.memberInfoDto?.address}</span></p>
          </div>
        </div>
      </div>


      <div>
        <h3 className="text-xl font-bold mb-2">프로필 정보</h3>
        <p className="flex items-center"><FaBirthdayCake className="mr-2" />나이: <span className="font-semibold ml-1">{detail?.profileDto?.age}</span></p>
        <p className="flex items-center"><FaVenusMars className="mr-2" />성별: <span className="font-semibold ml-1">{detail?.profileDto?.gender}</span></p>
        <p className="flex items-center"><FaWeightHanging className="mr-2" />벤치프레스: <span className="font-semibold ml-1">{detail?.profileDto?.benchPress}</span></p>
        <p className="flex items-center"><FaWeightHanging className="mr-2" />데드리프트: <span className="font-semibold ml-1">{detail?.profileDto?.deadLift}</span></p>
        <p className="flex items-center"><FaWeightHanging className="mr-2" />스쿼트: <span className="font-semibold ml-1">{detail?.profileDto?.squat}</span></p>
      </div>
      {/* 약속 생성 버튼 */}
      <CreateAppointmentButton handleCreateAppointment={handleCreateAppointment} />
    </div>
  );
};

export default RecruitmentDetail;