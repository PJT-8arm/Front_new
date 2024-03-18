// src/LoginPage.jsx
import React, { useState, useRef } from 'react';
import { useLogIn } from './openapi/orval_query/api/member-controller/member-controller';

function LoginPage() {
    const usernameRef = useRef(null); // useRef를 사용하여 username 입력란 참조
    const passwordRef = useRef(null); // useRef를 사용하여 password 입력란 참조
    const { mutate: login, isError, error } = useLogIn();

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        login({ data: { username, password } }); // 로그인 요청 실행
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
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
