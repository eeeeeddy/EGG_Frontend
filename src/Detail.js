import './Detail.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// function handleClick() {
//     alert('버튼이 클릭되었습니다!');
//   }

function Detail() {
    const [detailResult, setDetailResult] = useState([]);
    const params = useParams();

    const [searchQuery, setSearchQuery] = useState('');
    const onSubmit = async () => {
        window.location.href = "/search/" + searchQuery;
    };
    const navigate = useNavigate();
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

    useEffect(() => {

        const { article_id } = params;

        // Spring Boot API 엔드포인트에 GET 요청을 보냅니다.
        axios.get(`/search/${article_id}`)
            .then((response) => {
                // API 응답으로 받은 데이터를 검색 결과로 설정합니다.
                setDetailResult([response.data]);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
    }, [setDetailResult, params]);

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
                <div className='menu'>
                    <div className="top-menu3">
                        <div className="logo-container3">
                            <Link to="/">
                                <img src="/ditto_logo.jpg" alt="로고" className="logo3" />
                            </Link>
                            <h3>Ditto Graph</h3>
                            {/* 미니 검색창 */}
                            <div className='search-container3'>
                                <img src='/search_icon.png' alr='돋보기 아이콘' className='search-icon' />
                                <input className='search-input' type='search'
                                    autoComplete='off' spellCheck="false"
                                    role='combobox' aria-controls='matches'
                                    placeholder='논문제목,저자,키워드를 입력하세요'
                                    aria-expanded='false' aria-live='polite'
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="second-menu">
                <p>{detailResult.length > 0 ? detailResult[0].title_ko : '논문 제목이 없습니다.'}</p>
                <div className='button-container'>
                    <button className='button-bar'>저자<b>·</b>연구기관 관계</button>
                </div>
            </div>

            <div className="page-container">
                <div className="page">
                    <div className={`left-page ${isLeftPageOpen ? 'closed' : 'open'}`}>
                        <button onClick={toggleLeftPage} className='left-button'>
                            {isLeftPageOpen ? '◀' : '▶'}
                        </button>
                        <div className='leftpage-Search-container'>
                            <img src='/search_icon.png' alr='돋보기 아이콘' className='leftpage-search-icon' />
                            <input className='leftpage-search-input' type='search'
                                autoComplete='off' spellCheck="false"
                                role='combobox' aria-controls='matches'
                                aria-expanded='false' aria-live='polite' />
                            <button className='leftpage-search-button'>EXPAND</button>
                        </div>
                        {detailResult.map((result) => {
                            if (result.article_id) {
                                return (
                                    <div className="left-page-box" key={result.article_id}>
                                        <p><b>{result.title_ko}</b><br />
                                            <span className='left-page-author'>{result.author_name}</span>
                                            <span className='left-page-year'>{result.pub_year}</span></p>
                                    </div>
                                );
                            }
                            return null;
                        }
                        )}
                    </div>

                    <div><img src='/connected.PNG' alt='임시 이미지' className='graph' /></div>


                    <div className={`right-page ${isRightPageOpen ? 'open' : 'closed'}`}>
                        <button onClick={toggleRightPage} className='rignt-button'>
                            {isRightPageOpen ? '▶' : '◀'}
                        </button>
                        <div>
                            <ul className="nav nav-tabs">
                                <li className="active"><a href="#home" data-toggle="tab">Article</a></li>
                                <li><a href="#profile" data-toggle="tab">저자-연구기관</a></li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade in active" id="home">Home 메뉴</div>
                                <div className="tab-pane fade" id="profile">Profile 메뉴</div>
                            </div>
                        </div>
                        {detailResult.map((result) => {
                            if (result.article_id) {
                                return (
                                    <div className="right-page-box" key={result.article_id}>
                                        <h5><strong>{result.title_ko}</strong></h5><br />
                                        <span>저자: {result.author_name}</span><br /> <br />
                                        <span>발행년도: {result.pub_year}</span><br /> <br />
                                        <span>요약: {result.abstract_ko}</span>
                                    </div>
                                );
                            }
                            return ''; // 나머지는 표시하지 않음
                        })}
                    </div>
                </div>
            </div>

            <div>
                <div>도움말모달</div>
                <div>그래프 시점 초기화</div>
                <div>컬러바</div>
            </div>


        </div>
    );
}
export default Detail;