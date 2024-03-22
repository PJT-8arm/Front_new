import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useLogIn } from '../../openapi/orval_query/api/member-controller/member-controller';
import { useAuth } from './AuthContext';
import './login.css'; // CSS 파일 import

function LoginPage() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { mutate: login, isError, error } = useLogIn();
    const { logIn } = useAuth();
    const navigate = useNavigate(); // useNavigate 사용

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
    
        try {
            const response = await login({ data: { username, password } });
            console.log(response);
            logIn(response);
            navigate("/mypage/list"); // 페이지 이동
        } catch (error) {
            setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };
    

    return (
        <div className="container">
            <form className="login-form" onSubmit={onSubmitHandler}>
                <label>아이디:</label>
                <input type="text" ref={usernameRef} />
                <label>비밀번호:</label>
                <input type="password" ref={passwordRef} />
                {isError && <p style={{ color: 'red' }}>{errorMessage || error}</p>}
                <button type="submit" className="login-button">Login</button> {/* 로그인 버튼에 클래스 추가 */}

                {/* 버튼으로 회원가입 페이지로 이동 */}
                <Link to="/register" className="signup-link">회원가입</Link> {/* 회원가입 링크에 클래스 추가 */}
            </form>
            <div style={{ minHeight: '50px' }}></div> {/* 로그인 버튼이 항상 표시되도록 빈 div 추가 */}
        </div>
    );
}

export default LoginPage;
