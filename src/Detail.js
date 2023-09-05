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
          title: '멀티 프로세서 시스템-온-칩(MPSoC)을 위한 버스매트릭스 구조의 빠르고 정확한 예측 기법',
          author: '김성찬 / kim, Sungchan 1, 하순희 / Ha, Soonhoi     ',
          year: 2008,
          abstract: '본 논문은 큐잉 이론을 이용한 멀티 프로세서 시스템-온-칩(MPSoC)의 버스 매트릭스 기반 통신 구조에 대한 성능 예측 기법을 제안한다. 버스 매트릭스 기반 통신 구조는 다양한 설계 인자를 가지고 있어 이에 대한 성능 최적화는 방대한 설계 공간의 탐색을 필요로 하지만, 현재 널리 사용되고 있는 시뮬레이션에 기반한 방법은 많은 시간을 요구하기 때문에 점점 짧아지고 있는 시장 적기 출하(time-to-market) 제약 조건을 만족하기 어렵다. 이러한 문제를 해결하기 위하여 본 논문에서는 시뮬레이션보다 훨씬 빠르면서 정확하게 성능을 예측할 수 있는 기법을 개발하였다. 제안한 성능 분석 기법은 고성능의 버스 매트릭스를 위해 사용되는 버스 프로토콜인 multiple-outstanding transaction을 고려한다. 또한 지수 분포(exponential distribution)를 이용하여 비현실적으로 메모리 시스템을 모델하였던 기존의 연구들과 달리 실제적인 메모리 시스템 모델을 위하여 일반 분포(general distribution)를 이용하였다. 제안한 성능 예측 기법의 정확도 및 효율성을 검증하기 위하여 무작위로 생성된 버스 트랜잭션들과 4-채널 DVR 예제에 적용하였을 때, 사이클 단위의 정확도를 갖는 시뮬레이션과 비교하여 105배 이상 빠르면서 평균 94% 이상의 정확도를 갖는 것으로 분석되었다.',
          keyword :'#멀티 프로세서 시스템-온-칩 #통신 구조 #버스 매트릭스 #성능 예측 #큐잉 이론',
        },
        {
          id: 2,
          title: '멀티 프로세서 시스템-온-칩(MPSoC)을 위한 버스매트릭스 구조의 빠르고 정확한 예측 기법',
          author: '김성찬 / kim, Sungchan 1, 하순희 / Ha, Soonhoi',
          year: 2008,
          abstract: 'Abstract of paper 2...',
        },
        {
          id: 3,
          title: '멀티 프로세서 시스템-온-칩(MPSoC)을 위한 버스매트릭스 구조의 빠르고 정확한 예측 기법',
          author: '김성찬 / kim, Sungchan 1, 하순희 / Ha, Soonhoi',
          year: 2008,
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
          <div className='leftpage-Search-container'>
          <img src='/search_icon.png' alr='돋보기 아이콘' className='leftpage-search-icon'/>
          <input className='leftpage-search-input' type='search' 
           autoComplete='off' spellCheck="false"
           role='combobox' aria-controls='matches' 
           aria-expanded='false' aria-live='polite'/>
           </div>
            {papers.map((paper) => (
              <div className="left-page-box" key={paper.id}>
                <p><b>{paper.title}</b><br/>
                <span className='left-page-author'>{paper.author} </span>
                <span className='left-page-year'>{paper.year}</span></p>
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
          {papers.map((paper) => {
            if (paper.id === 1) {
              return (
                <div className="right-page-box" key={paper.id}>
                  <p><b>{paper.title}</b><br/>
                  Author: {paper.author}<br/>
                  Year: {paper.year}<br/>
                  Abstract: {paper.abstract}</p>
                </div>
              );
            }
            return ''; // 나머지는 표시하지 않음
            })}
          </div>
    </div>
    </div>
    );
}
export default Detail;