//History.js_1003

import React, { useEffect, useState } from 'react';
import './css/History.css';

function History() {
  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 논문 히스토리 가져오기
    const lastOpenedPaperJSON = localStorage.getItem('lastOpenedPaper');
    const lastOpenedPaper = JSON.parse(lastOpenedPaperJSON) || [];

    // 데이터가 배열 형식인지 확인
    if (Array.isArray(lastOpenedPaper)) {
      // null 또는 undefined인 항목을 제거하고 최근 본 논문 10개를 유지하기 위해 배열로 변환하고 새 데이터를 추가
      const filteredHistory = lastOpenedPaper.filter(item => item && item.title_ko);
      setUserHistory(filteredHistory);
    } else {
      // 배열 형식이 아닌 경우, 기본값 또는 오류 처리를 수행
      setUserHistory([]);
      console.error('Invalid data in localStorage');
}
  }, []); // 빈 배열을 의존성 배열로 지정하여 컴포넌트가 처음 마운트될 때만 실행

  // Abstract 텍스트를 최대 3줄까지 보이도록 가공
  const formatAbstract = (text) => {
    const lines = text.split('\n');
    if (lines.length > 3) {
      // 텍스트가 3줄보다 많으면 최대 3줄까지만 보이도록 가공
      return lines.slice(0, 3).join('\n') + '...';
    }
    return text;
  };

  const ClickOpenKCI = (article_id) => {
    const kciUrl = `https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=` + article_id;
    console.log(kciUrl);
    // 새 창으로 KCI 링크 열기
    window.open(kciUrl);
}

  return (
    <div className="history-container">
      <h2 className="history-title">History</h2>
      <ul className="history-list">
        {userHistory.map((item, index) => (
          <li key={index} className="history-item">
            <p className='history-item-title' onClick={() => ClickOpenKCI(item.article_id)}>[ {item.title_ko} ]</p>
            <p className="history-item-author">{item.author_name}</p>
            <p className="history-item-abstract">{formatAbstract(item.abstract_ko)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
