import './Main.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isShowInfo, setIsShowInfo] = useState(false);
    const navigate = useNavigate();
    // useNavigate 훅을 사용하여 네비게이션 함수를 가져옵니다.

    const handleShowButtonClick = () => {
        setIsShowInfo(!isShowInfo);
        // 작은 페이지 가시성 상태를 토글
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (searchQuery.trim() === '') {
                window.alert('검색어를 입력하세요.');
            } else {
                console.log('검색어가 입력되었습니다.');
                navigate(`/search/${encodeURIComponent(searchQuery)}`);
                // 검색어를 포함하여 Search 페이지로 이동합니다.
            }
        }
    };
    const handleSearchClick = () => {
        if (searchQuery.trim() === '') {
            window.alert('검색어를 입력하세요.');
        } else {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
        }// 검색어를 포함하여 Search 페이지로 이동합니다.
    };

    return (
        <div className="Main">
            <header>
                <div className="top-menu">
                    <div className="logo-container">
                        <img src="/ditto_logo.jpg" alt="로고" className="logo" />
                        <h3>Ditto Graph</h3>
                    </div>
                    {/* <div className="menu-links">
                        <a href="#">About</a>
                        <a href="#">Pricing</a>
                        <a href="https://www.google.co.kr">google</a>
                        <a href="https://www.naver.com">Naver</a>
                    </div> */}
                </div>
            </header>
            <div className='Main-body'>
                <h1>Explore academic papers in a visual graph</h1><br />
                <h3>To start, enter a paper identifier</h3><br />

                {/* 검색창 */}
                <div className='search'>
                    <div className='search-container'>
                        <img src='/search_icon2.png' alt='돋보기 아이콘' className='search-icon' />
                        <input
                            className='search-input' type='search'
                            autoComplete='off'
                            aria-live='polite'
                            placeholder='논문제목, 저자, 키워드를 입력하세요'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
                        />
                    </div>
                    <button className='search-button' type='button' onClick={handleSearchClick}><b>검색</b></button>
                </div>
                <div className='separator-container'>
                    {/* <div className="separator"> */}
                    <button className="show-button" type="button" onClick={handleShowButtonClick}>
                        {isShowInfo ? '사이트 이용 방법 △' : '사이트 이용 방법 ▽'} </button>
                    {isShowInfo && (
                        <div className="show-info">
                            <h5> 사이트 설명서 </h5>
                            <p>이 곳은 사이트의 설명이 들어갈 자리입니다.
                                아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</p>
                        </div>)}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}
export default Main;
