import './Detail.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EggNavbar from './Navbar';

function Test() {
    const [detailResult, setDetailResult] = useState([]);
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLeftPageOpen, setIsLeftPageOpen] = useState(true);
    const [highlightedText, setHighlightedText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const { article_id } = params;

        // Spring Boot API 엔드포인트에 GET 요청을 보냅니다.
        axios.get(`/search/${article_id}`)
            .then((response) => {
                // API 응답으로 받은 데이터를 검색 결과로 설정합니다.
                setDetailResult([response.data]);
                // console.log(response.data);
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
    }, [setDetailResult, params]);

    useEffect(() => {
        // detailResult 데이터가 로드되면 isLoading을 false로 설정
        // 그래프 생성되면 detailResult부분 수정 필요
        if (detailResult.length > 0) {
            setIsLoading(false);
        }
    }, [detailResult]);

    const toggleLeftPage = () => {
        setIsLeftPageOpen(!isLeftPageOpen);
    };

    return (
        <div>
            <div className='Navbar'>
                <EggNavbar />
            </div>

            <div className='row'>

                {/* left-page */}
                <div className='col-md-2 z-1'>
                    <div className={`card left-page ${isLeftPageOpen ? 'closed' : 'open'}`} style={{ width: "350px", height: "100%" }}>
                        <div className='card-body pt-1'>
                            <div className='d-flex'>
                                {/* 돋보기 이미지 */}
                                <div className='p-2 flex-fill'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="32" fill="currentColor" class="bi bi-search" viewBox="0 -3 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                                {/* 입력창 */}
                                <div className='p-2 flex-fill'>
                                    <input className='form-control me-2' type='search'
                                        autoComplete='off' spellCheck="false"
                                        role='combobox' aria-controls='matches'
                                        aria-expanded='false' aria-live='polite'
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setHighlightedText(e.target.value);
                                        }} />
                                </div>
                                {/* filter 버튼 */}
                                <div className='p-2 flex-fill'>
                                    <button type="button" className='btn btn-success'>FILTER</button>
                                </div>
                            </div>
                            {/* 그래프 그려진 논문 리스트 */}
                            <div className='mt-2'>
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
                        <button className='left-button' onClick={toggleLeftPage}>
                            {isLeftPageOpen ? '◀' : '▶'}
                        </button>
                    </div>
                </div>

                {/* graph-section */}
                <div className='col-md-7 z-0'>
                    <img src='/connected.PNG' alt="no" />
                </div>

                {/* right-section */}
                <div className='col-md-3 z-0'>
                    <div className="card card-body">
                        <div className='col-lg-3'>
                            {detailResult.map((result) => {
                                if (result.article_id) {
                                    return (
                                        <div className="right-page-box" key={result.article_id} style={{ width: '370px' }}>
                                            <h5><strong>{result.title_ko}</strong></h5><br />
                                            <span>{result.author_name}</span><br />
                                            <span>{result.pub_year}, {result.journal_name}</span><br />
                                            <span>{result.citation_count} citaion</span><br />
                                            <br />
                                            <span>{result.abstract_ko}</span><br />
                                            <br />
                                        </div>
                                    );
                                }
                                return ''; // 나머지는 표시하지 않음
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Test;