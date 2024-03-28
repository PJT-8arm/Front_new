import React, { useEffect, useState } from 'react';
import { useAuth } from '../signUp/AuthContext';
import axios from 'axios'; // Axios 라이브러리 import
import { axiosInstance } from '../../utils/axiosInstance'; // AXIOS_INSTANCE 대신에 axiosInstance를 가져옵니다.


const UserProfile = () => {
    const { user, logOut, setUser } = useAuth(); // 로그인 정보 및 로그아웃 함수 가져오기
    const [isLoggedIn, setIsLoggedIn] = useState(!!user); // 로그인 상태 여부를 상태로 관리

    const handleLogout = async () => {
        try {
            // 서버에 로그아웃 요청 보내기
            await axiosInstance.post('/api/members/logout'); // 예시: '/logout'는 실제로 사용하는 로그아웃 엔드포인트 URL로 변경해야 합니다.

            // 로컬 상태 및 컨텍스트 상태 업데이트
            logOut(); // 컨텍스트 상태 업데이트
            setUser(null); // 로컬 상태 업데이트
            setIsLoggedIn(false); // 로그인 상태 업데이트

            console.log('로그아웃되었습니다.');
        } catch (error) {
            console.error('로그아웃 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        // 사용자가 로그인되었는지 확인
        if (user) {
            setIsLoggedIn(true); // 사용자가 로그인되었으면 로그인 상태 업데이트
            console.log('사용자가 로그인되었습니다.');
        } else {
            setIsLoggedIn(false); // 사용자가 로그인되지 않았으면 로그인 상태 업데이트
            console.log('사용자가 로그인되지 않았습니다.');
        }
    }, [user]); // user 상태가 변경될 때마다 실행되도록 함

    // 유저 정보가 있는지 확인하고, 있으면 이름과 이메일을 표시
    // 실제 user 객체의 구조에 따라 알맞게 수정해야 합니다.
    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h1>👤 유저 프로필</h1>
                    <p>이름: {user.username}</p>
                    <button onClick={handleLogout}>로그아웃</button> {/* 로그아웃 버튼 */}
                </>
            ) : (
                <p>로그인 상태가 아닙니다.</p>
            )}
        </div>
    );
};

export default UserProfile;