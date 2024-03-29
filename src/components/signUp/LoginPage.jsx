import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useLogIn } from '../../openapi/orval_query/api/member-controller/member-controller';
import { useAuth } from './AuthContext';
import './login.css'; // CSS 파일 import
import { axiosInstance } from '../../utils/axiosInstance';

function LoginPage() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { mutate: signIn, isError, error } = useLogIn();
    const { logIn } = useAuth();
    const navigate = useNavigate(); // useNavigate 사용

    const handleLogIn = async (body) => {
        axiosInstance({
            url: '/api/members/login',
            method: 'post',
            data: body
        }).then(
            response => { navigate("/mypage/list"); }
        )
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        try {
            handleLogIn({username, password});
        } catch (error) {
            setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 회원가입 페이지로 이동하는 함수
    const goToRegisterPage = () => {
        navigate("/register");
    };


    return (
        <div className="container">
            <div className='title' style={{ width: '16rem' }}>
                <img src='/images/logo.png'></img>
            </div>
            <form className="login-form" onSubmit={onSubmitHandler}>
                <div className="label-container">
                    <div className='content'>
                        <label>아이디</label>
                    </div>
                    <input type="text" ref={usernameRef} style={{ width: '100%' }} />
                </div>
                <div className="label-container">
                    <div className='content'>
                        <label>비밀번호</label>
                    </div>
                    <input type="password" ref={passwordRef} style={{ width: '100%' }} />
                    {isError && <p style={{ color: 'red' }}>{errorMessage || error}</p>}
                </div>
                <div className='button-container'>
                    <button type="submit" className="login-button">로그인</button> {/* 로그인 버튼에 클래스 추가 */}
                </div>
                {/* 버튼으로 회원가입 페이지로 이동 */}
                <button type="button" className="signup-link" onClick={goToRegisterPage}>
                    <img src='/images/join.png'></img>
                    <p>회원가입</p>
                </button> {/* 회원가입 버튼 추가 */}
            </form>
        </div>
    );
}

export default LoginPage;