import './Detail.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from './Main';

// function handleClick() {
//     alert('버튼이 클릭되었습니다!');
//   }

function Detail() {  
    const papers = [
        {
          id: 1,
          title: 'Paper 1',
          author: 'Author 1',
          year: 2023,
          abstract: 'Abstract of paper 1...',
        },
        {
          id: 2,
          title: 'Paper 2',
          author: 'Author 2',
          year: 2022,
          abstract: 'Abstract of paper 2...',
        },
        {
          id: 3,
          title: 'Paper 3',
          author: 'Author 3',
          year: 2021,
          abstract: 'Abstract of paper 3...',
        },
      ];
      
      const [isLeftPageOpen, setIsLeftPageOpen] = useState(true);
      const [isRightPageOpen, setIsRightPageOpen] = useState(true);

      const toggleLeftPage = () => {
        setIsLeftPageOpen(!isLeftPageOpen);
      };

      const toggleRightPage = () => {
        setIsRightPageOpen(!isRightPageOpen);
      };


    return (
        <div>
        <header>
        <div className="top-menu3">
        <div className="logo-container3">
            <Link to="/">
              <img src="/ditto_logo.jpg" alt="로고" className="logo3" />
            </Link>
          <h3>Ditto Graph</h3>
           {/* 미니 검색창 */}
          <div className='search-container3'>
          <img src='/search_icon.png' alr='돋보기 아이콘' className='search-icon'/>
          
          <input className='search-input' type='search' 
           autoComplete='off' spellCheck="false"
           role='combobox' aria-controls='matches' 
           placeholder='논문제목,저자,키워드를 입력하세요'
           aria-expanded='false' aria-live='polite'/>
        </div>
        </div>
        <div className="menu-links3">
          <a href="#">About</a>
          <a href="#">Pricing</a>
          <a href="#">menu1</a>
          <a href="#">menu2</a>
        </div>
        </div>
        
        <div className="second-menu">
          <p>멀티 프로세서 시스템-온-칩(MPSoC)을 위한 버스 매트릭스 구조의 빠르고 정확한 성능 예측 기법</p>
          <div className='button-container'>
          <button className='button-bar'>저자 관계</button>
          <button className='button-bar'>연구 기관 관계</button>
          </div>
        </div>
        </header> 

        <div className="page">
        <div className={`left-page ${isLeftPageOpen ? 'closed' : 'open'}`}>
          <button onClick={toggleLeftPage} className='left-button'>
            {isLeftPageOpen ? '◀' : '▶'}
          </button>
          <h3>논문 리스트</h3>
            {papers.map((paper) => (
              <div className="left-page-box" key={paper.id}>
                <p><b>{paper.title}</b><br/>
                Author: {paper.author}<br/>
                Year: {paper.year}<br/>
                Abstract: {paper.abstract}</p>
              </div>
            ))}
        </div>
        <div className="middle-page">
        <h3>그래프 넣을 자리↓</h3>
        </div>

        <div className={`right-page ${isRightPageOpen ? 'open' : 'closed'}`}>
          <button onClick={toggleRightPage} className='rignt-button'>
            {isRightPageOpen ? '▶' : '◀'}
          </button>
          <h3>논문 상세 내용</h3>
          {/* 논문 상세 내용을 이곳에 표시 */}
          </div>
    </div>
    </div>
    );
}
export default Detail;