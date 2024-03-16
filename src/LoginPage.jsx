import React, { useState, useRef } from 'react';
import axios from 'axios';

function LoginPage() {
    const usernameRef = useRef(null); // useRef를 사용하여 username 입력란 참조
    const passwordRef = useRef(null); // useRef를 사용하여 password 입력란 참조
    const [error, setError] = useState(""); // 로그인 에러 메시지 추가

    const onSubmitHandler = async (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        const username = usernameRef.current.value; // useRef로 참조한 입력란의 값 가져오기
        const password = passwordRef.current.value; // useRef로 참조한 입력란의 값 가져오기

        const body = {
            username: username,
            password: password,
        }

        try {
            // API 호출하여 로그인 처리
            const response = await axios.post('/api/members/login', body, {withCredentials: true});
            if (response.status === 200) {
                // 로그인 성공 시 리다이렉트 등의 처리
                //window.location.href = '/'; // 예시: 메인 페이지로 리다이렉트 테스트를 위해 잠시 주석처리
            } else {
                setError('로그인 실패. 이름과 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            // 에러 처리
            console.error('로그인 오류:', error);
            setError('로그인 중 오류가 발생했습니다.');
        }
    }

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>username</label>
                <input type='text' ref={usernameRef} /> {/* useRef로 입력란에 참조 추가 */}
                <label>password</label>
                <input type='password' ref={passwordRef} /> {/* useRef로 입력란에 참조 추가 */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <br />
                <button type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage;
