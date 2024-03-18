import React, { useState } from 'react';
import './components/signUp/signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [Email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== ConfirmPassword) {
      setError('비밀번호와 비밀번호 확인이 같지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('/api/members/join', { 
        email: Email,
        username: username,
        password: password
      });

      console.log('회원가입 성공:', response.data); // 성공 응답 출력

      // 여기에 회원가입 성공 시 필요한 처리를 추가할 수 있습니다.
      navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동

    } catch (error) {
      console.error('회원가입 오류:', error); // 오류 처리
      setError('회원가입 중 오류가 발생했습니다.'); // 오류 메시지 설정
    }
  }

  return (
    <div className='container'>
      <form className='signup-form' onSubmit={onSubmitHandler}>
        <div className='input-forms-item'>
          <label className='input-label'>Email</label>
          <input type='email' value={Email} onChange={onEmailHandler} />
        </div>
        <div className='input-forms-item'>
          <label className='input-label'>Username</label> 
          <input type='text' value={username} onChange={onUsernameHandler} />
        </div>
        <div className='input-forms-item'>
          <label className='input-label'>Password</label>
          <input type='password' value={password} onChange={onPasswordHandler} />
        </div>
        <div className='input-forms-item'>
          <label className='input-label'>Confirm Password</label>
          <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}
        <div className='button-container'>
          <button type='submit'>회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
