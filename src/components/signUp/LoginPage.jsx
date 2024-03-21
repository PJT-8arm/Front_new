import React, { useRef } from 'react';
import { useLogIn } from '../../openapi/orval_query/api/member-controller/member-controller';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const { mutate: login, isError, error } = useLogIn();
    const { logIn } = useAuth(); // 로그인 상태 및 함수 사용
    const navigator = useNavigate();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        
        login({ data: { username, password } }, {
            onSuccess: (response) => {
                // 로그인 성공 시
                console.log(response);
                logIn(response); // Context의 user 상태를 업데이트
                navigator("/mypage");
            },
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={onSubmitHandler}>
                <label>Username:</label>
                <input type="text" ref={usernameRef} />
                <label>Password:</label>
                <input type="password" ref={passwordRef} />
                {isError && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;