import './Test.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Collapse } from 'bootstrap';

// function handleClick() {
//     alert('버튼이 클릭되었습니다!');
//   }

function Test() {
    const [detailResult, setDetailResult] = useState([]);
    const params = useParams();

    const [searchQuery, setSearchQuery] = useState('');
    const onSubmit = async () => {
        window.location.href = "/test/" + searchQuery;
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

            {/* graph 영역 */}
            <div className='d-flex justify-content-sm-center mt-5 z-0 position-absolute'>
                <img src='/connected.PNG' />
            </div>

            <div className='row'>
                {/* left-page */}
                <div className='z-2 position-relative mt-1 col-3'>
                    <div className='d-flex flex-row'>
                        <div className='p-2'>
                            <button
                                className="btn btn-primary"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseWidthExample1"
                                aria-expanded="false"
                                aria-controls="collapseWidthExample1"
                            >
                                ▶
                            </button>
                        </div>

                        <div className='p-2'>
                            <div className="collapse collapse-horizontal" id="collapseWidthExample1">
                                <div className="card card-body" style={{ width: "400px" }}>
                                    <div>
                                        <div className='d-flex'>
                                            <div className='p-2 flex-fill'>
                                                <img src='/search_icon.png' className='leftpage-search-icon' />
                                            </div>

                                            <div className='p-2 flex-fill'>
                                                <input className='leftpage-search-input' type='search'
                                                    autoComplete='off' spellCheck="false"
                                                    role='combobox' aria-controls='matches'
                                                    aria-expanded='false' aria-live='polite' />
                                            </div>

                                            <div className='p-2 flex-fill'>
                                                <button type="button" className='btn btn-primary btn-sm'>EXPAND</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        {detailResult.map((result) => (
                                            <div className="left-page-box" key={result.id} style={{ width: '370px' }}>
                                                <b>{result.title_ko}</b><br />
                                                <span className='left-page-author'>{result.author_name} </span> <br />
                                                <span className='left-page-year'>{result.pub_year}</span> <br />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='z-2 position-relative col-6'></div>

                {/* right-page */}
                <div className='z-2 position-relative mt-5 col-3'>
                    <div className='d-flex flex-row'>
                        <div className='p-2'>
                            <button
                                className="btn btn-primary"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseWidthExample2"
                                aria-expanded="false"
                                aria-controls="collapseWidthExample2"
                            >
                                ◀
                            </button>
                        </div>

                        <div className="collapse collapse-horizontal" id="collapseWidthExample2">
                            <div className="card card-body" style={{ width: "400px" }}>
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
                                <div className='col-lg-3'>
                                    {detailResult.map((result) => {
                                        if (result.article_id) {
                                            return (
                                                <div className="right-page-box" key={result.article_id} >
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
                    </div>
                </div>
            </div>
























        </div>
    );
}
export default Test;