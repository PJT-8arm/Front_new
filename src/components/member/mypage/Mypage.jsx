import React, { useState, useEffect } from 'react';
import { mypageDetails, useMypageDetails } from '../../../openapi/orval_query/api/mypage-controller/mypage-controller';
import { Link, Outlet } from 'react-router-dom';
import LinkSetter from '../../utils/LinkSetter';
import { useAuth } from '../../signUp/AuthContext';

function Mypage(props) {
    const { user, logOut } = useAuth();

    console.log(user);

    return (
        <>
            {/* 상단 유저 정보 */}
            <section className='flex justify-between w-full items-center p-2'>
                {/* 프로필 이미지 삽입 / Null일 경우 대체이미지 */}
                {user?.imgUrl !== null &&
                    (<img className='w-20 h-20 rounded-full' src={user?.imgUrl} alt="null" />)}
                {user?.imgUrl === null &&
                    (<img className='w-20 h-20 rounded-full' src={"src/assets/sinsegeong.png"} alt="sinsegeong2" />)}

                <p>{user?.nickname + "님"}</p>
                <button className='btn btn-primary' onClick={logOut}>로그아웃</button>
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