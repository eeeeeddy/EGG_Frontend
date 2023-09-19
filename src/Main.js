import './Main.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EggMainNavbar from './MainNavbar';

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
        <div>

            <div className='Navbar'>
                <EggMainNavbar />
            </div>

            <div className='MainBody'>
                <h1>Explore academic papers in a visual graph</h1><br />
                <h3>To start, enter a paper identifier</h3><br />

                {/* 검색창 */}
                <div className='search'>
                    <div className='searchInput'>
                        <img src='/search_icon2.png' alt='돋보기 아이콘' className='searchIcon' />
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
                    <button className='searchButton' type='button' onClick={handleSearchClick}><b>검색</b></button>
                </div>


                <div className='descript'>
                    <button className="descriptShowButton" type="button" onClick={handleShowButtonClick}>
                        {isShowInfo ? '사이트 이용 방법 △' : '사이트 이용 방법 ▽'} </button>
                    {isShowInfo && (
                        <div className="showDescript">
                            <p style={{textAlign: 'center'}}><h2>사이트 설명</h2></p>
                        </div>)}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}
export default Main;
