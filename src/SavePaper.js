import React, { useState, useEffect } from 'react';
import axios from './AxiosConfig';
import EggNavbar from './Navbar';
import './css/SavePaper.css';

function SavePaper() {
  const [savedPapers, setSavedPapers] = useState([]);

  useEffect(() => {
    // 서버에서 저장된 논문을 가져오기 위해 HTTP GET 요청을 수행합니다.
    axios.get('/api/save/papers')
      .then((response) => {
        setSavedPapers(response.data);
      })
      .catch((error) => {
        console.error('저장된 논문을 가져오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  const handleDeletePaper = (articleId) => {
    if (articleId) { // articleId가 유효한 경우에만 요청을 보내도록 수정
      console.log("article", articleId);
      axios
        .delete(`/api/save/papers/${articleId}`)
        .then((response) => {
          // 성공적으로 삭제된 경우 클라이언트에서도 해당 항목을 제거
          setSavedPapers(savedPapers.filter(paper => paper.articleId !== articleId)); // article_id -> articleId로 수정
        })
        .catch((error) => {
          console.error('논문 삭제 중 오류가 발생했습니다:', error);
        });
    } else {
      console.error("articleId is undefined or not set.");
    }
  }

  const ClickOpenKCI = (article_id) => {
    const kciUrl = `https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=` + article_id;
    console.log(kciUrl);
    // 새 창으로 KCI 링크 열기
    window.open(kciUrl);
  }

  return (
    <div style={{ fontFamily: 'MaruBuri-Regular' }}>
      <div className='App'>
        <EggNavbar />
      </div>
      <div className="save-container">
        <h2 className="save-title">Save Papers</h2>
        <ul className="save-list">
          {savedPapers.map((paper, idx) => (
            <li key={idx} className="save-item">
              <p className='save-item-title' onClick={() => ClickOpenKCI(paper.articleId)}>{paper.title_ko}</p>
              <p className="save-item-author">{paper.author_name}</p>
              <p className="save-item-abstract">{paper.abstract_ko}</p>
              <button className="btn btn-outline-success rounded-pill" type="submit" onClick={() => handleDeletePaper(paper.articleId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SavePaper;