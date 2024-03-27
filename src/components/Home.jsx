import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    const [recruitmentData, setRecruitmentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [itemsPerPage] = useState(4); // 페이지당 표시할 항목 수
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태


    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api/'
    })
  
    useEffect(() => {
      const fetchRecruitmentData = async () => {
        try {
          const response = await axiosInstance.get('recruitments/list');
          // 등록 시간이 늦은 순으로 정렬
          const sortedData = response.data.sort((a, b) => new Date(b.recruitmentDto.recruit_date) - new Date(a.recruitmentDto.recruit_date));
          setRecruitmentData(sortedData);
        } catch (error) {
          console.error('Error fetching recruitment data:', error);
        }
      };
  
      fetchRecruitmentData();
    }, []);


    // 검색어를 포함하는 항목 필터링 함수
    const filteredItems = recruitmentData.filter(item =>{
        const searchString = `${item.recruitmentDto.title} ${item.recruitmentDto.partnerAge} ${item.recruitmentDto.partnerGender} ${item.recruitmentDto.place} ${item.recruitmentDto.routine}`.toLowerCase();
       
        return searchString.includes(searchTerm.toLowerCase());
    });
  
    // 전체 페이지 수 계산
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  
    // 페이지 변경 이벤트 핸들러
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 검색어 입력 핸들러
    const handleSearch = (e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // 검색 시 첫 페이지로 이동
          };
  
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

     // 페이지 번호 생성
     const renderPagination = () => {
        const paginationButtons = [];
      
        // 이전 버튼
        paginationButtons.push(
            <li key="prev">
                <button className="btn btn-ghost btn-sm" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    이전
                </button>
            </li>
        );

        // 페이지 번호 버튼
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(startPage + 4, totalPages);

        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationButtons.push(
                <li key={i}>
                    <button className={`btn btn-sm ${currentPage === i ? 'btn-active btn-link' : 'btn-ghost'}`} onClick={() => paginate(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        // 다음 버튼
        paginationButtons.push(
            <li key="next">
                <button className="btn btn-ghost btn-sm" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    다음
                </button>
            </li>
        );

        return paginationButtons;
    };

    
  
      
  return (
    <div>
           <div style={{marginTop: '4rem'}}> {/* 상단에 고정된 Topbar 높이 만큼 공간 확보 */}
            {/* 이하 내용은 그대로 유지 */}
           </div>
            <div className='Topbar' style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, display: 'flex', backgroundColor: 'white' }}>
              <div className='logo' style={{margin:'0.5rem 1rem 0rem 1rem'}}>
                <img src='/public/logo.png' alt='로고 이미지'/>
              </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin:'0.5rem 1rem 0.5rem 1rem'}}>
                <label style={{ height: 30, width: 180 }} className="input input-bordered flex items-center">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <svg
                    style={{ position: 'absolute', right: 0, marginRight: '1.5rem' }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-5 h-5 opacity-70">
                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                  </svg>
                </label>
              </div>
            </div>
      <ul>
      <Link to={`/recruitments/write`}>
        <div style={{display: 'flex', justifyContent : 'end', marginRight: '1rem'}}>
            <button className="btn  btn-sm " style={{fontSize: '1rem'}}>📝 모집글 작성하기</button>
        </div>
        </Link>
        {/* 현재 페이지의 데이터만 반복하여 표시합니다. */}
        {currentItems.map((item, index) => (
          <li key={index}>
            <Link to={`/recruitments/detail/${item.recruitmentDto.id}`}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="card w-90 bg-base-100 shadow-xl">
                    <div className="cardbody">
                      <div className="avatar2">
                        <img src={item.memberInfoDto.imgUrl} className="rounded-full" alt="avatar" />
                      </div>
                      <div className='content'>
                        <div className="badge badge-primary">
                          <p className='nickname'>{item.memberInfoDto.nickname}</p>
                        </div>
                        <div className='titlebox'>
                          <p className='title'>{item.recruitmentDto.title}</p>
                        </div>
                        <div className='tag'>
                          <p className='tag-list'>{'#' + item.recruitmentDto.partnerAge + '대'}</p>
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
      {currentItems.length > 0 && (
      <ul className="pagination" >
        {renderPagination()}
        </ul>
      )}
    </div>
  );
}

export default Home;