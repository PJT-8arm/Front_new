import React, { useEffect, useState } from 'react';
import { useAuth } from '../../signUp/AuthContext';
import axios from 'axios'; // Axios 라이브러리 import
import { mypageDetails, useMypageDetails } from '../../../openapi/orval_query/api/mypage-controller/mypage-controller';
import { Link, Outlet } from 'react-router-dom';
import LinkSetter from '../../utils/LinkSetter';
import { axiosInstance } from '../../../utils/axiosInstance'; // AXIOS_INSTANCE 대신에 axiosInstance를 가져옵니다.


function Mypage(props) {
    const { user, logOut, setUser } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    const handleLogout = async () => {
        try {
            // 서버에 로그아웃 요청 보내기
            await axiosInstance({
                url: '/api/members/logout',
                method: 'post',
            });
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

    return (
        <>
            {/* 상단 유저 정보 */}
            <section className='flex justify-between w-full items-center p-2'>
                {/* 프로필 이미지 삽입 / Null일 경우 대체이미지 */}
                {user?.imgUrl !== null &&
                    (<img className='w-20 h-20 rounded-full' src={user?.imgUrl} alt="null" />)}
                {user?.imgUrl === null &&
                    (<img className='w-20 h-20 rounded-full' src={"/images/sinsegeong.png"} alt="sinsegeong2" />)}

                <p>{user?.nickname + "님"}</p>
                <button className='btn btn-sm btn-outline btn-error' onClick={handleLogout}>로그아웃</button>
            </section>
            <div className='p-2 divider' />
            <main>
                {/* mypage 내용 */}
                <Outlet />
            </main>
        </>
    );
}

export default Mypage;