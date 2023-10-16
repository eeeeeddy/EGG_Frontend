// Main.js
import './css/Main.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EggMainNavbar from './MainNavbar';

function Main() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isShowInfo, setIsShowInfo] = useState(false);
    const [isShowInfo2, setIsShowInfo2] = useState(false);
    const navigate = useNavigate();

    const handleShowButtonClick = () => {
        setIsShowInfo(!isShowInfo);
    };

    const handleShowButtonClick2 = () => {
        setIsShowInfo2(!isShowInfo2);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (searchQuery.trim() === '') {
                window.alert('검색어를 입력하세요.');
            } else {
                console.log('검색어가 입력되었습니다.');
                navigate(`/search/${encodeURIComponent(searchQuery)}`);
            }
        }
    };

    const handleSearchClick = () => {
        if (searchQuery.trim() === '') {
            window.alert('검색어를 입력하세요.');
        } else {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className='Main' >
            <div className='Navbar'>
                <EggMainNavbar />
            </div>

            <div className={`MainBody ${isShowInfo ? 'showDescriptOpen' : ''}`}>
                <h1>Egg Graph</h1><br />
                <h3>Explore academic papers in a visual graph</h3><br />

                <div className='search'>
                    <div className='searchInput' style={{ textAlign: 'center' }}>
                        <input
                            className='search-input'
                            type='search'
                            autoComplete='off'
                            aria-live='polite'
                            placeholder='논문제목, 저자, 키워드를 입력하세요'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{ paddingLeft: 10 }}
                        />
                        <button className='searchButton' type='button' onClick={handleSearchClick}><b>Search</b></button>
                    </div>
                </div>
                <div style={{ height: 120 }}></div>
            </div>

            <div className='foot'>
                <div className='descript'>
                    <button className={`descriptShowButton ${isShowInfo ? 'clicked' : ''}`} type="button" onClick={handleShowButtonClick}>
                        <span className='buttonText'>{isShowInfo ? 'Category △' : 'Category ▽'}
                        </span>
                    </button>
                    <div className={`showDescript ${isShowInfo ? 'show' : ''}`}>
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
                    </div>
                    <button className={`descriptShowButton2 ${isShowInfo2 ? 'clicked' : ''}`} type="button" onClick={handleShowButtonClick2}>
                        <span className="buttonText2">
                            {isShowInfo2 ? 'How to use it △' : 'How to use it ▽'}
                        </span>
                    </button>
                    <div className={`showDescript2 ${isShowInfo2 ? 'show' : ''}`}>
                        <p style={{ textAlign: 'center' }}></p>
                        <p>이 페이지는 영국에서 시작하여....</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
