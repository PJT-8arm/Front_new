import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecruitmentForm from './components/recuitment/RecruitmentForm';
import RecruitmentDetail from './components/recuitment/RecruitmentDetail'; // 임포트한 RecruitmentDetail 컴포넌트
import Navbar from './components/Navbar';
import Appointment from './components/appointment/Appointment';
import Chat from './components/chat/Chat';
import Ranking from './components/ranking/Ranking';
import Mypage from './components/mypage/Mypage';
import LoginPage from './LoginPage';
import Home from './components/Home';
import RegisterPage from './components/signUp/RegisterPage';
import './App.css';

function App() {
  const [isLogined, setlogin] = useState(true);

  return (
    <>
      <Router>
        <button onClick={() => {
          setlogin(isLogined ? false : true);
          console.log("isLogined:", isLogined);
        }}>{isLogined ? '로그아웃' : '로그인'}</button>
        <main>
        <Routes>
          {/* 약속 화면으로 접근했을 때 보여줄 컴포넌트 */}
          <Route path="/appointment" element={<Appointment />}></Route>
          {/* 랭킹 화면으로 접근했을 때 보여줄 컴포넌트 */}
          <Route path="/ranking" element={<Ranking />}></Route>
          {/* 채팅 화면으로 접근했을 때 보여줄 컴포넌트 */}
          <Route path="/chat" element={<Chat />}></Route>
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
        </Routes>
        </main>
        <footer>
          <Navbar isLogined={isLogined} />
        </footer>
      </Router>

    </>
  );
}

export default App;
