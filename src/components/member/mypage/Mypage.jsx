import React, { useState, useEffect } from 'react';
import { mypageDetails, useMypageDetails } from '../../../openapi/orval_query/api/mypage-controller/mypage-controller';
import { Link } from 'react-router-dom';
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
                    (<img className='w-20 h-20 rounded-full' src={user?.imgUrl} alt="sinsegeong1" />)}
                {user?.imgUrl === null &&
                    (<img className='w-20 h-20 rounded-full' src={"src/assets/sinsegeong.png"} alt="sinsegeong2" />)}

                <p>{user?.nickname + "님"}</p>
                <button className='btn btn-primary' onClick={logOut}>로그아웃</button>
            </section>
            <div className='p-2 divider'/>
            {/* 페이지 목록 */}
            <section className='flex flex-col mx-2'>
                <article className='mt-2'>
                    <h2 className='mt-2 font-bold text-lg'>나의 활동</h2>
                    <LinkSetter goto={'myrecruitment'}
                    addedClassName={'flex items-center mx-4 mt-2'}
                    icon={<svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg>}
                    name={<span className='mx-2'>나의 모집</span>}
                    />
                    <LinkSetter goto={'myappointment'}
                    addedClassName={'flex items-center mx-4 mt-2'}
                    icon={<svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>}
                    name={<span className='mx-2'>나의 약속</span>}
                    />
                </article>
                <article className='mt-2'>
                    <h2 className='mt-2 font-bold text-lg'>내 정보</h2>
                    <LinkSetter goto={'profile'}
                    addedClassName={'flex items-center mx-4 mt-2'}
                    icon={<svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H512zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM208 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H176zM376 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z"/></svg>}
                    name={<span className='mx-2'>프로필 수정</span>}
                    />
                    <LinkSetter goto={'undefined'}
                    addedClassName={'flex items-center mx-4 mt-2'}
                    icon={<svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M302.8 312C334.9 271.9 408 174.6 408 120C408 53.7 354.3 0 288 0S168 53.7 168 120c0 54.6 73.1 151.9 105.2 192c7.7 9.6 22 9.6 29.6 0zM416 503l144.9-58c9.1-3.6 15.1-12.5 15.1-22.3V152c0-17-17.1-28.6-32.9-22.3l-116 46.4c-.5 1.2-1 2.5-1.5 3.7c-2.9 6.8-6.1 13.7-9.6 20.6V503zM15.1 187.3C6 191 0 199.8 0 209.6V480.4c0 17 17.1 28.6 32.9 22.3L160 451.8V200.4c-3.5-6.9-6.7-13.8-9.6-20.6c-5.6-13.2-10.4-27.4-12.8-41.5l-122.6 49zM384 255c-20.5 31.3-42.3 59.6-56.2 77c-20.5 25.6-59.1 25.6-79.6 0c-13.9-17.4-35.7-45.7-56.2-77V449.4l192 54.9V255z"/></svg>}
                    name={<span className='mx-2'>내 지역 설정</span>}
                    />
                    <LinkSetter goto={'modifyinfo'}
                    addedClassName={'flex items-center mx-4 mt-2'}
                    icon={<svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/></svg>}
                    name={<span className='mx-2'>회원 정보 수정</span>}
                    />
                </article>
                <article className='mt-2'>
                    <h2 className='mt-4 font-bold text-lg'>기타</h2>
                    <LinkSetter goto={'qna'}
                    addedClassName={'flex items-center mx-4 mt-2'}
                    icon={<svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>}
                    name={<span className='mx-2'>문의하기</span>}
                    />
                </article>
            </section>
            

        </>
    );
}

export default Mypage;