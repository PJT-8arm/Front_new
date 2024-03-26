import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  // useState 훅을 사용하여 각 입력 필드의 상태를 관리합니다.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 회원가입 요청을 서버로 보냅니다.
      const response = await axios.post('http://localhost:8080/api/members.join', {
        username,
        email,
        password
      });
      
      // 회원가입이 성공하면 홈페이지로 리다이렉트합니다.
      // 여기서는 간단히 alert 창을 띄우도록 하였습니다.
      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      // 에러가 발생하면 에러 메시지를 상태에 저장합니다.
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>회원가입</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>사용자 이름:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>이메일:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>비밀번호:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? '가입 중...' : '가입하기'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
