import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const [recruitmentData, setRecruitmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [itemsPerPage] = useState(4); // 페이지당 표시할 항목 수

  useEffect(() => {
    const fetchRecruitmentData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recruitments/list');
        // 등록 시간이 늦은 순으로 정렬
        const sortedData = response.data.sort((a, b) => new Date(b.recruitmentDto.recruit_date) - new Date(a.recruitmentDto.recruit_date));
        setRecruitmentData(sortedData);
      } catch (error) {
        console.error('Error fetching recruitment data:', error);
      }
    };

    fetchRecruitmentData();
  }, []);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(recruitmentData.length / itemsPerPage);

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recruitmentData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 이벤트 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 날짜 형식 변환 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  return (
    <div>
      <ul>
        {/* 현재 페이지의 데이터만 반복하여 표시합니다. */}
        {currentItems.map((item, index) => (
          <li key={index}>
            <Link to={`/recruitments/detail/${item.recruitmentDto.id}`}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="card w-90 bg-base-100 shadow-xl">
                    <div className="cardbody">
                      <div className="avatar">
                        <img src={item.memberInfoDto.imgUrl} className="rounded-full" alt="avatar" />
                      </div>
                      <div className='content'>
                        <div className="badge badge-primary">
                          <p className='nickname'>{item.memberInfoDto.nickname}</p>
                        </div>
                        <h2 className="title">{item.recruitmentDto.title}</h2>
                        <div className='tag'>
                          <p className='tag-list'>{'#' + item.recruitmentDto.partnerAge}</p>
                          <p className='tag-list'>{'#' + item.recruitmentDto.partnerGender}</p>
                          <p className='tag-list'>{'#' + item.recruitmentDto.place}</p>
                          <p className='tag-list'>{'#' + item.recruitmentDto.routine}</p>
                        </div>
                        <p className='date'>{formatDate(item.recruitmentDto.recruit_date)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {/* 페이지네이션 버튼 */}
      <ul className="pagination">
        <li>
            <button className="btn btn-ghost btn-sm" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            이전
            </button>
        </li>
        {/* 페이지 번호 버튼 */}
        {Array.from({ length: Math.min(totalPages, 5 ) }, (_, i) => {
            const pageNumber = currentPage <= 4 ? i + 1 : currentPage - 4 + i;
            return (
            <li key={i}>
                <button
                className={`btn btn-sm ${currentPage === pageNumber ? 'btn-active btn-link' : 'btn-ghost'}`}
                onClick={() => paginate(pageNumber)}
                >
                {pageNumber}
                </button>
            </li>
            );
        })}
        <li>
            <button className="btn btn-ghost btn-sm" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            다음
            </button>
        </li>
        </ul>

    </div>
  );
}

export default Home;
