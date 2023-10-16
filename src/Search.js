// Search.js

import './css/Search.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EggNavbar from './Navbar';

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // URL 파라미터로부터 검색어를 가져옵니다.
        const { searchQuery } = params;

        if (searchQuery === 'loading') {
            setIsLoading(true);
            return; // 데이터를 불러오지 않고 로딩 상태로 남김
        }
        setIsLoading(true);

        // Spring Boot API 엔드포인트에 GET 요청을 보냅니다.
        axios.get(`/search/_search/${params.searchQuery}`)
            .then((response) => {
                // 데이터 불러오기 완료 후 로딩 상태 변경
                setIsLoading(false);
                // API 응답으로 받은 데이터를 검색 결과로 설정합니다.
                setSearchResult(response.data);
                console.log("결과", response.data);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error('API 요청 중 오류 발생:', error);
            });
    }, [setSearchResult, searchQuery, setIsLoading, params]);

    const TextStyle = {
        textAlign: 'center'
    };

    // paper-box를 클릭했을 때 detail 페이지로 이동하는 함수
    const handlePaperBoxClick = (articleId) => {
        navigate(`/Detail/${articleId}`);
    };

    return (
        <div style={{ fontFamily: 'MaruBuri-Regular' }}>
            <div className='Navbar'>
                <EggNavbar />
            </div>

            <div className="paper-container">
                <div className="paper-text" style={{ float: 'left' }}>
                    <p style={TextStyle}>
                        {params.searchQuery
                            ? `'${decodeURIComponent(params.searchQuery)}' 에 대한 논문 검색 결과`
                            : '에 대한 논문 검색 결과'}</p>
                    <h3 style={TextStyle}><b>Choose Article for Graph :</b></h3>
                    <br />
                </div>
                <div>
                    {isLoading ? (
                        <div className="spinner-border text-info" role="status"></div>
                    ) : (
                        <div className="paper-box-container">
                            {searchResult.length > 0 ? (
                                searchResult.map((result) => (
                                    // 검색 결과를 여기서 필요한대로 렌더링하세요.
                                    <div key={result.articleID} className="paper-box"
                                        onClick={() => handlePaperBoxClick(result.articleID)}>
                                        <h4>{result.titleKor}</h4>
                                        <p><span className='paperbox-author'>{result.authors}</span>
                                            <span className='paperbox-year'>{result.pubYear}</span><br /><br />
                                            <span className='paperbox-p'>"{result.abstractKor}"</span></p>
                                    </div>
                                ))
                            ) : (
                                <h4>검색 결과가 없습니다.</h4>
                            )
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;