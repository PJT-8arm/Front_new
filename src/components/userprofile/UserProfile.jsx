import React, { useEffect } from 'react';
import { useAuth } from '../signUp/AuthContext';

const UserProfile = () => {
    const { user } = useAuth(); // 현재 로그인된 유저 정보 가져오기

    useEffect(() => {
        // 사용자가 로그인되었는지 확인
        if (user) {
            console.log('사용자가 로그인되었습니다.');
        } else {
            console.log('사용자가 로그인되지 않았습니다.');
        }
    }, [user]); // user 상태가 변경될 때마다 실행되도록 함

    // 유저 정보가 있는지 확인하고, 있으면 이름과 이메일을 표시
    // 실제 user 객체의 구조에 따라 알맞게 수정해야 합니다.
    return (
        <div>
            {user ? (
                <>
                    <h1>👤 유저 프로필</h1>
                    <p>이름: {user.username}</p>
                </>
            ) : (
                <p>로그인 상태가 아닙니다.</p>
            )}
        </div>
    );
};

export default UserProfile;
