import './Main.css';
import React, { useState, onSubmit} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main() {
    const [searchQuery, setSearchQuery] = useState('');
    const onSubmit = async () => {
        window.location.href = "/search/" + searchQuery;
    };
    const navigate = useNavigate();
     // useNavigate 훅을 사용하여 네비게이션 함수를 가져옵니다.

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
                    <div className="menu-links">
                        {/* <Link to='/search'>About</Link> */}
                        {/* <a href="./Search">About</a> */}
                        <a href="#">About</a>
                        <a href="#">Pricing</a>
                        <a href="https://www.google.co.kr">google</a>
                        <a href="https://www.naver.com">Naver</a>
                    </div>
                </div>
            </header>
            <div className='Main-body'>
                <h1>Explore academic papers</h1>
                <h1>in a visual graph</h1>
                <br></br>
                {/* 검색창 */}
                <div className='search'>
                    <div className='search-container'>
                        <img src='/search_icon2.png' alr='돋보기 아이콘' className='search-icon' />
                        <input
                            className='search-input' type='search'
                            autoComplete='off' spellCheck="false"
                            role='combobox'
                            aria-controls='matches'
                            aria-expanded='false'
                            placeholder='논문제목,저자,키워드를 입력하세요'
                            aria-live='polite'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
                        />
                    </div>
                    <button className='search-button' type='button' onClick={handleSearchClick}>검색</button>
                </div>
            </div>
        </div>
    );
}
export default Main;
