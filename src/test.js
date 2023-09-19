import './Test.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import EggNavbar from './Navbar';

function Test() {
    const [detailResult, setDetailResult] = useState([]);
    const params = useParams();

    const [searchQuery, setSearchQuery] = useState('');
    const onSubmit = async () => {
        window.location.href = "/test/" + searchQuery;
    };

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

    return (
        <div>
            <div className='Navbar'>
                <EggNavbar />
            </div>

            {/* 추가: 토글 버튼 */}
            <p>
                <button
                    className="btn btn-primary"
                    type="button"
                    data-bs-toggle="collapse" // Bootstrap 콜랩스 토글을 위한 속성 추가
                    data-bs-target="#collapseWidthExample" // Bootstrap 콜랩스 타겟 지정
                    aria-expanded="false" // 콜랩스 상태에 따라 aria-expanded 변경
                >
                    Toggle width collapse
                </button>
            </p>
            {/* 추가: 컬랩스블 영역 */}
            <div>
                <div
                    className="collapse collapse-horizontal" // 컬랩스블 상태에 따라 클래스 조작
                    id="collapseWidthExample"
                >
                    <div className="card card-body" style={{ width: '300px' }}>
                        This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                    </div>
                </div>
            </div>

            {/* graph 영역 */}
            <div className='row'>
                {/* graph-section */}
                <div className='col-md-9'>
                    <img src='/connected.PNG' />
                </div>

                {/* right-section */}
                <div className='col-md-3'>
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

            {/* left-section */}

            {/* <div className='z-1'>    
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                    ▶
                </button>
                <div>
                    <div className="collapse collapse-horizontal" id="collapseWidthExample">
                        <div className="card card-body" style={{ width: "400px" }}>
                            <div>
                                <div className='d-flex'>
                                    <div className='p-2 flex-fill'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="32" fill="currentColor" class="bi bi-search" viewBox="0 -3 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </div>

                                    <div className='p-2 flex-fill'>
                                        <input className='form-control me-2' type='search'
                                            autoComplete='off' spellCheck="false"
                                            role='combobox' aria-controls='matches'
                                            aria-expanded='false' aria-live='polite' />
                                    </div>

                                    <div className='p-2 flex-fill'>
                                        <button type="button" className='btn btn-success'>FILTER</button>
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
            </div> */}
        </div>
    );
}
export default Test;