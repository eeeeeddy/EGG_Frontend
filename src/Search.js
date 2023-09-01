import './Search.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Main from './Main';

function Search() {
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
          const TextStyle = {
            textAlign: 'center'
          };
     
    return (
        <div>
        <header>
        <div className="top-menu2">
        <div className="logo-container2">
            <Link to="/">
              <img src="/ditto_logo.jpg" alt="로고" className="logo2" />
            </Link>
          <h3>Ditto Graph</h3>
           {/* 미니 검색창 */}
          <div className='search-container2'>
          <img src='/search_icon.png' alr='돋보기 아이콘' className='search-icon'/>
          
          <input className='search-input' type='search' 
           autoComplete='off' spellCheck="false"
           role='combobox' aria-controls='matches' 
           placeholder='논문제목,저자,키워드를 입력하세요'
           aria-expanded='false' aria-aria-live='polite'/>
        </div>
        </div>
        <div className="menu-links2">
          <a href="#">About</a>
          <a href="#">Pricing</a>
          <a href="#">menu1</a>
          <a href="#">menu2</a>
        </div>
        </div>
        </header>


        <div className="paper-container">
        <div className="paper-text" style={{float: 'left'}}>
        <p style={TextStyle}>'Data'에 대한 논문 검색 결과</p>
        <b><p style={TextStyle}>그래프를 그릴 논문을 골라주세요 : </p></b>
        <br/>
        </div>
        {papers.map((paper) => (
          <div key={paper.id} className="paper-box">
            <h2>{paper.title}</h2>
            <p>Author: {paper.author}</p>
            <p>Year: {paper.year}</p>
            <p>Abstract: {paper.abstract}</p>
          </div>))}
        </div>
        

        </div>
    );
}
export default Search;