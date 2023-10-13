import './css/Main.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EggMainNavbar from './MainNavbar';

function Main() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isShowInfo, setIsShowInfo] = useState(false);
    const [isShowInfo2, setIsShowInfo2] = useState(false);
    const navigate = useNavigate();
    // useNavigate 훅을 사용하여 네비게이션 함수를 가져옵니다.

    const handleShowButtonClick = () => {
        setIsShowInfo(!isShowInfo);
        if (isShowInfo2 === true) {
            setIsShowInfo2(!isShowInfo2)

        } else {
            setIsShowInfo2(isShowInfo2)
        }
        // 작은 페이지 가시성 상태를 토글
    };

    const handleShowButtonClick2 = () => {
        setIsShowInfo2(!isShowInfo2)
        if (isShowInfo === true) {
            setIsShowInfo(!isShowInfo)
        } else {
            setIsShowInfo(isShowInfo);
        }
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
                        {isShowInfo ? 'Category △' : 'Category ▽'} </button>
                    {isShowInfo && (
                        <div className="showDescript">
                            <p style={{ textAlign: 'center' }}></p>
                            <ul>
                                <li>ML</li>
                                <li>Network</li>
                                <li>Databases</li>
                                <li>Software</li>
                                <li>Operating System</li>
                                <li>Computer Vision</li>
                                <li>Security</li>
                                <li>Computation</li>
                                <li>Hardware</li>
                                <li>Programming Language</li>
                                <li>Data Structure</li>
                                <li>Robotics</li>
                                <li>Mathematics</li>
                            </ul>
                        </div>)}
                    <button className="descriptShowButton2" type="button" onClick={handleShowButtonClick2}>
                        {isShowInfo2 ? 'How to use it △' : 'How to use it ▽'} </button>
                    {isShowInfo2 && (
                        <div className="showDescript2">
                            <p style={{ textAlign: 'center' }}></p>
                            <p> 이 페이지는 영국에서 시작하여....</p>
                        </div>)}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}
export default Main;
