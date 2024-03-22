import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useHref } from 'react-router-dom';
import RecruitmentForm from './components/recuitment/RecruitmentForm';
import RecruitmentDetail from './components/recuitment/RecruitmentDetail'; // 임포트한 RecruitmentDetail 컴포넌트
import Navbar from './components/Navbar';
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
import Topbar from './components/Topbar'
import './App.css'

function App() {
  const [isLogined, setlogin] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Topbar />
          <main className='main-content'>
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
                <Route path='/mypage/list' element={<MypageList />}></Route>
                <Route path='/mypage/modifyinfo' element={<ModifyInfo />}></Route>
                <Route path='/mypage/profile' element={<Profile />}></Route>
                <Route path="/mypage/myrecruitment" element={<Myrecruitment />}></Route>
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
              <Route path='/profile' element={<UserProfile />} />
            </Routes>
          </main>
          <footer className='h-16 w-full Navbar'>
            <Navbar isLogined={isLogined} />
          </footer>
        </div>
      </Router>

    </ AuthProvider>
  );
}

export default App;