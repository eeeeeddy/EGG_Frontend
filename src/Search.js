import './Search.css';
import React,{useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import Main from './Main';
import axios from 'axios';


function Search() {
	const [searchQuery, setSearchQuery] = useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const params = useParams();

	useEffect(() => {
		// URL 파라미터로부터 검색어를 가져옵니다.
		const { searchQuery } = params;
	
		// Spring Boot API 엔드포인트에 GET 요청을 보냅니다.
		axios.get(`http://localhost:8080/search/?searchKeyword=${searchQuery}`)
		.then((response) => {
			// API 응답으로 받은 데이터를 검색 결과로 설정합니다.
			setSearchResult(response.data);
			console.log(response.data);
			// console.log(searchResults);
		})
		.catch((error) => {
			console.error('API 요청 중 오류 발생:', error);
		});
	}, [setSearchResult]);

	const TextStyle = {
		textAlign: 'center'
	};

	return (
		<div>
			<header>
				<div className="top-menu2">
					<div className="logo-container2">
						<Link to="/">
							<img src="/ditto_logo.jpg" alt="로고" className="logo2" />
						</Link>
						<h3>Ditto Graph</h3>
						{/* 미니 검색창 */}
						<div className='search-container2'>
							<img src='/search_icon.png' alr='돋보기 아이콘' className='search-icon' />

							<input className='search-input' type='search'
								autoComplete='off' spellCheck="false"
								role='combobox' aria-controls='matches'
								placeholder='논문제목,저자,키워드를 입력하세요'
								aria-expanded='false' aria-live='polite' />
						</div>
					</div>
					<div className="menu-links2">
						<a href="#">About</a>
						<a href="#">Pricing</a>
						<a href="#">menu1</a>
						<a href="#">menu2</a>
					</div>
				</div>
			</header>

			<div className="paper-container">
				<div className="paper-text" style={{ float: 'left' }}>
					<p style={TextStyle}>
					{params.searchQuery
                            ? `'${decodeURIComponent(params.searchQuery)}' 에 대한 논문 검색 결과`
                            : '에 대한 논문 검색 결과'}
                    </p>
					<b><h3 style={TextStyle}>Choose Article for Graph : </h3></b>
					<br />
				</div>
				{searchResult.map((result) => (
                    // 검색 결과를 여기서 필요한대로 렌더링하세요.
                    <div key={result.article_id} to={`/Detail/`} className="paper-box">
                        <h2>{result.title_ko}</h2>
                        <p>저자: {result.author_name}</p>
                        <p>발행년도: {result.pub_year}</p>
                        <p>요약: {result.abstract_ko}</p>
                    </div>
                ))}
			</div>
		</div>
	);
}
export default Search;