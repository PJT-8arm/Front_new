import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecruitmentForm from './components/recuitment/RecruitmentForm';
import RecruitmentDetail from './components/recuitment/RecruitmentDetail'; // 임포트한 RecruitmentDetail 컴포넌트
import Navbar from './components/Navbar';
import Appointment from './components/appointment/Appointment';
import Ranking from './components/ranking/Ranking';
import Mypage from './components/member/mypage/Mypage';
import LoginPage from './components/signUp/LoginPage';
import Home from './components/Home';
import RegisterPage from './components/signUp/RegisterPage';
import UserProfile from './components/userprofile/UserProfile';
import { AuthProvider } from './components/signUp/AuthContext';
import ChatRoom from './components/chat/chatRoom/ChatRoom';
import ChatRoomList from './components/chat/chatRoomList/ChatRoomList';
import Myrecruitment from './components/member/mypage/myrecruitment/Myrecruitment'
import ModifyInfo from './components/member/mypage/modifyInfo/ModifyInfo';
import MypageList from './components/member/mypage/MypageList';
import Profile from './components/member/mypage/profile/Profile';

function App() {
  const [isLogined, setlogin] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className='flex flex-col items-center'>
          <main className='min-h-full min-w-full'>
          <div className='Topbar' style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div className='logo' style={{margin:'0.5rem 1rem 0rem 1rem'}}>
                    <img src='/src/logo.png' alt='로고 이미지'/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin:'0.5rem 1rem 0rem 1rem'}}>
                  <label style={{ height: 40, width: 180 }} className="input input-bordered flex items-center">
                      <input style={{ paddingRight: '2rem' }} type="text" className="grow" placeholder="Search" />
                      <svg style={{ position: 'absolute', right: 0, marginRight: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                  </label>
                </div>
            </div>

            <Routes>
              {/* 약속 화면으로 접근했을 때 보여줄 컴포넌트 */}
              {/* <Route path="/appointment" element={<Appointment />}></Route> */}
              {/* 랭킹 화면으로 접근했을 때 보여줄 컴포넌트 */}
              {/* <Route path="/ranking" element={<Ranking />}></Route> */}
              {/* 채팅 화면으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/chat/list" element={<ChatRoomList />}></Route>
              {/* 채팅 방으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/chat/room/:roomId" element={<ChatRoom />}></Route>
              {/* 마이페이지 화면으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/mypage" element={<Mypage />}>
                <Route path='/mypage/list' element={<MypageList/>}></Route>
                <Route path='/mypage/modifyinfo' element={<ModifyInfo/>}></Route>
                <Route path='/mypage/profile' element={<Profile />}></Route>
                <Route path="/mypage/myrecruitment" element={<Myrecruitment/>}></Route>
              </Route>
              {/* 로그인 화면으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/login" element={<LoginPage />} />
              {/* 회원가입 페이지 */}
              <Route path="/register" element={<RegisterPage />} />
              {/* 메인 페이지로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/" element={<Home />} />
              {/* 모집 글 작성페이지로 접글했을 때 보여줄 컴포넌트 */}
              <Route path="/recruitments/write" element={<RecruitmentForm />} />
              {/* 상세 페이지의 경로와 매칭될 컴포넌트 */}
              <Route path="/recruitments/detail/:id" element={<RecruitmentDetail />} />
              {/* 다른 모든 경로에 대한 처리. 404 페이지나 메인 페이지 리다이렉트 등의 로직을 추가할 수 있습니다. */}
              <Route path='/profile' element={<UserProfile/>} />
            </Routes>
          </main>
          <footer className='h-16 w-full'>
            <Navbar isLogined={isLogined} />
          </footer>
        </div>
      </Router>

    </ AuthProvider>
  );
}

export default App;