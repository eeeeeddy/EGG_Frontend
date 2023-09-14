import './Search.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Search() {
	const [searchResult, setSearchResult] = useState([]);
	const params = useParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');

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
		// URL 파라미터로부터 검색어를 가져옵니다.
		const { searchQuery } = params;

		if (searchQuery === 'loading') {
			setIsLoading(true);
			return; // 데이터를 불러오지 않고 로딩 상태로 남김
		}
		setIsLoading(true);

		// Spring Boot API 엔드포인트에 GET 요청을 보냅니다.
		axios.get(`/search/?searchKeyword=${searchQuery}`)
			.then((response) => {
				// 데이터 불러오기 완료 후 로딩 상태 변경
				setIsLoading(false);
				// API 응답으로 받은 데이터를 검색 결과로 설정합니다.
				setSearchResult(response.data);
				console.log(response.data);
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
								autoComplete='off' aria-expanded='false'
								aria-live='polite'
								placeholder='검색어를 입력하세요'
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
							/>
						</div>
					</div>
				</div>
			</header>
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
						<div className="spinner-border text-info" role="status">
							{/* <span className="visually-hidden">Loading...</span> */}
						</div>
					) : (
						<div className="paper-box-container">
							{searchResult.map((result) => (
								// 검색 결과를 여기서 필요한대로 렌더링하세요.
								<div key={result.article_id} className="paper-box"
									onClick={() => handlePaperBoxClick(result.article_id)}>
									<h4>{result.title_ko}</h4>
									<p>{result.author_name}<br />
										{result.pub_year}<br /><br />
										<span className='paperbox-p'>{result.abstract_ko}</span></p>
								</div>
							))}
						</div>
					)} </div>
			</div>
		</div>
	);
}
export default Search;