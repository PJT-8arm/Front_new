import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecruitmentForm from './components/recuitment/RecruitmentForm';
import RecruitmentDetail from './components/recuitment/RecruitmentDetail'; // 임포트한 RecruitmentDetail 컴포넌트
import Mypage from './components/member/mypage/Mypage';
import LoginPage from './LoginPage';
import './App.css';

function App() {
  const [isLogined, setlogin] = useState(false);

  return (
    <>
      <Router>
        <div className='flex flex-col items-center'>
          <main className='min-h-full'>
            <button className="btn btn-primary" onClick={() => {
              setlogin(isLogined ? false : true);
              console.log("isLogined:", isLogined);
            }}>{isLogined ? '로그아웃' : '로그인'}</button>
            <Routes>
              {/* 마이페이지 화면으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/mypage" element={<Mypage />}></Route>
              {/* 로그인 화면으로 접근했을 때 보여줄 컴포넌트 */}
              <Route path="/login" element={<LoginPage />} />
              {/* 상세 페이지의 경로와 매칭될 컴포넌트 */}
              <Route path="/recruitments/detail/:id" element={<RecruitmentDetail />} />
              {/* 다른 모든 경로에 대한 처리. 404 페이지나 메인 페이지 리다이렉트 등의 로직을 추가할 수 있습니다. */}
            </Routes>
          </main>
          <footer className='h-16 w-full'>
          </footer>
        </div>
      </Router>

    </>
  );
}

export default App;
