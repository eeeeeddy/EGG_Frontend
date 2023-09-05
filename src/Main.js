
import './Main.css';
import React, { useState } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';


function Main() {
  const [searchQuery, setSearchQuery] = useState('');
   // 검색어 상태 관리

   const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // console.log('검색어:', searchQuery);
      console.log('Enter 키가 눌렸습니다.');
      // 검색어가 입력되었을 때 또는 입력하지 않았을 때 모두 Search.js로 이동
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="Main">
      <header>
      <div className="top-menu">
      <div className="logo-container">
        <img src="/ditto_logo.jpg" alt="로고" className="logo" />
        <h3>Ditto Graph</h3>
      </div>
      <div className="menu-links">
        {/* <Link to='/search'>About</Link> */}
        {/* <a href="./Search">About</a> */}
        <a href="#">About</a>
        <a href="#">Pricing</a>
        <a href="https://www.naver.com">Naver</a>
        <a href="#">menu2</a>
      </div>
      </div>
      </header>
      <div className='Main-body'>
        <h2>Explore academic papers</h2>
        <h2>in a visual graph</h2>
        <br></br>
        {/* 검색창 */}
        <div className='search-container'>
          <img src='/search_icon2.png' alr='돋보기 아이콘' className='search-icon'/>
          <input 
          className='search-input' type='search'
          autoComplete='off' spellCheck="false"
          role='combobox' 
          aria-controls='matches' 
          aria-expanded='false' 
          placeholder='논문제목,저자,키워드를 입력하세요' 
          aria-live='polite' value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
          />
        </div>
      </div>

    </div>
  );
  }
  export default Main;
  