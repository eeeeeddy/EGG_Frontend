import './Detail.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EggNavbar from './Navbar';

function Detail() {
    const [detailResult, setDetailResult] = useState([]);
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState('');

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

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // detailResult 데이터가 로드되면 isLoading을 false로 설정
        // 그래프 생성되면 detailResult부분 수정 필요
        if (detailResult.length > 0) {
            setIsLoading(false);
        }
    }, [detailResult]);
    // 로딩화면 확인용
    // const isLoading = true;

    const [isLeftPageOpen, setIsLeftPageOpen] = useState(true);
    const [isRightPageOpen, setIsRightPageOpen] = useState(true);

    const toggleLeftPage = () => {
        setIsLeftPageOpen(!isLeftPageOpen);
    };
    const toggleRightPage = () => {
        setIsRightPageOpen(!isRightPageOpen);
    };

    const [highlightedText, setHighlightedText] = useState('');

    return (
        <div>
            <div className='Navbar'>
                <EggNavbar />
            </div>


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
                            <img src='/search_icon.png' alt='돋보기 아이콘' className='leftpage-search-icon' />
                            <input className='leftpage-search-input' type='search'
                                autoComplete='off' spellCheck="false"
                                role='combobox' aria-controls='matches' id='leftpage-search-input'
                                aria-expanded='false' aria-live='polite' name='leftpage-search-input'
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setHighlightedText(e.target.value);
                                }} />
                            <button className='leftpage-search-button'>EXPAND</button>
                        </div>
                        <div className='leftpage-box-container'>
                            {detailResult.map((result) => {
                                if (result.article_id) {
                                    const regex = new RegExp(`(${searchQuery})`, 'gi');
                                    const titleWithHighlight = result.title_ko.replace(
                                        regex,
                                        (match) => `<span class="highlighted">${match}</span>`);
                                    const authorWithHighlight = result.author_name.replace(
                                        regex,
                                        (match) => `<span class="highlighted">${match}</span>`);
                                    const yearWithHighlight = result.pub_year.toString().replace(
                                        regex,
                                        (match) => `<span class="highlighted">${match}</span>`);
                                    const abstractWithHighlight = result.abstract_ko.replace(
                                        regex,
                                        (match) => `<span class="highlighted">${match}</span>`);
                                    return (
                                        <div className="left-page-box" key={result.article_id}>
                                            <p><b><span dangerouslySetInnerHTML={{ __html: titleWithHighlight }}></span></b><br />
                                                <span className='left-page-author' dangerouslySetInnerHTML={{ __html: authorWithHighlight }}></span><br />
                                                <span className='left-page-year' dangerouslySetInnerHTML={{ __html: yearWithHighlight }}></span><br />
                                                <span className='paperbox-p' dangerouslySetInnerHTML={{ __html: abstractWithHighlight }}></span></p>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="loading-screen">
                            <div className="spinner-border text-info" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className='graph'><img src='/connected.PNG' alt='임시 이미지' /></div>
                    )}
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