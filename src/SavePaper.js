import React, { useState, useEffect } from 'react';
import axios from './AxiosConfig';
import { useLocation } from 'react-router-dom';


function SavePaper() {
    const [savedPapers, setSavedPapers] = useState([]);
  
    useEffect(() => {
      // 서버에서 저장된 논문을 가져오기 위해 HTTP GET 요청을 수행합니다.
      axios.get('/api/save/papers') // 실제 API 엔드포인트로 교체
        .then((response) => {
          setSavedPapers(response.data);
        })
        .catch((error) => {
          console.error('저장된 논문을 가져오는 중 오류가 발생했습니다:', error);
        });
    }, []);

  const ClickOpenKCI = (article_id) => {
    const kciUrl = `https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=` + article_id;
    console.log(kciUrl);
    // 새 창으로 KCI 링크 열기
    window.open(kciUrl);
  }

  return (
    <div className="save-container">
      <h2 className="save-title">Save Papers</h2>
      <ul className="save-list">
        {savedPapers.map((paper, idx) => (
          <li key={idx} className="save-item">
            <p className='save-item-title' onClick={() => ClickOpenKCI(paper.article_id)}>{paper.title_ko}</p>
            <p className="save-item-author">{paper.author_name}</p>
            <p className="save-item-abstract">{paper.abstract_ko}</p>
          </li>
         ))}
      </ul>
    </div>
  );
}

export default SavePaper;
