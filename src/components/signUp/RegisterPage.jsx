import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Upload from '../file/Upload';
import { axiosInstance } from '../../utils/axiosInstance';

function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [imgUrl, setImgUrl] = useState();
  const navigate = useNavigate();

<<<<<<< HEAD
=======

>>>>>>> d643d82 (fix : axiosinstance 수정)
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value);
  }

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axiosInstance({
        url: '/api/members/join',
        method: 'post',
        data: {
          name,
          username,
          nickname,
          password,
          imgUrl
        }
      });

      console.log('회원가입 성공:', response);

      // 회원가입 성공 시 필요한 처리를 추가할 수 있습니다.
      navigate('/login');

    } catch (error) {
      console.error('회원가입 오류:', error);
      setError('회원가입 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className='container'>
      <div className='memberjoin'>
        <img src='/images/join.png'></img>
        <p>회원가입</p>
      </div>
      <form className='signup-form' onSubmit={onSubmitHandler}>
        <div className='input-forms-item'>
          <label className='input-label'>이름</label>
          <input type='text' value={name} onChange={onNameHandler} />
        </div>
        <div className='input-forms-item'>
          <label className='input-label'>아이디</label>
          <input type='text' value={username} onChange={onUsernameHandler} />
        </div>
        <div className='input-forms-item'>
          <label className='input-label'>닉네임</label>
          <input type='text' value={nickname} onChange={onNicknameHandler} />
        </div>
        <div className='input-forms-item'>
          <label className='input-label'>비밀번호</label>
          <input type='password' value={password} onChange={onPasswordHandler} />
        </div>
        <div className='input-forms-item'>
          <label className='input-label'>비밀번호 확인</label>
          <input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler} />
        </div>
        <div className='profile-image-uploading-container'>
          <label className='input-label'>프로필 사진</label>
          <Upload setImgUrl={setImgUrl} />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='button-container'>
          <button type='submit'>가입하기</button>
        </div>

      </form>
    </div>
  );
}

export default RegisterPage;