// CreateAppointmentButton.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAppointmentButton = ({ handleCreateAppointment }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    handleCreateAppointment();
    navigate('/appointment/write'); // 원하는 경로로 수정 가능
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      약속 생성
    </button>
  );
};

export default CreateAppointmentButton;
