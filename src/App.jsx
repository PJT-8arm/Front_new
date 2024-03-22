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

function App() {
  const [isLogined, setlogin] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className='flex flex-col items-center'>
          <main className='min-h-full min-w-full'>
            <Routes>
              {/* 약속 화면으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/appointment" element={<Appointment />}></Route>
              {/* 랭킹 화면으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/ranking" element={<Ranking />}></Route>
              {/* 채팅 화면으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/chat/list" element={<ChatRoomList />}></Route>
              {/* 채팅 방으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/chat/room/:roomId" element={<ChatRoom />}></Route>
              {/* 마이페이지 화면으로 접근했을 때 보여줄 컴포넌트 */}      
              <Route path="/mypage" element={<Mypage />}></Route>
              {/* 로그인 화면으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/login" element={<LoginPage />} />
              {/* 회원가입 페이지 */}
              <Route path="/register" element={<RegisterPage />} />
              {/* 메인 페이지로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/" element={<Home />} />
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
