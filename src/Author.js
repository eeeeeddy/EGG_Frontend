import React, { useEffect, useState } from 'react';
import { Document, Page, pdf } from '@react-pdf/renderer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// PDF 문서 컴포넌트
const PdfDocument = ({ authorResult }) => {
    return (
        <Document>
            <Page>
                {/* PDF에 표시할 컨텐츠를 여기에 추가 */}
                <h2>{authorResult.name}</h2>
                <p>Institution: {authorResult.institution}</p>
            </Page>
        </Document>
    );
};

// 저자 정보 컴포넌트
function Author({ onClose }) {
    // 모달 관련 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    // URL 파라미터 가져오기
    const params = useParams();
    const { authorQuery } = params;

    // 저자 정보 상태
    const [authorResult, setAuthorResult] = useState([]);

    // 데이터 로딩 여부 상태
    const [isLoading, setIsLoading] = useState(true);

    // 페이지가 로드될 때 저자 정보를 불러옴
    useEffect(() => {
        if (authorQuery === 'loading') {
            setIsLoading(true);
            return;
        }

        setIsLoading(true);

        axios.get(`/author/${authorQuery}`) // URL 패턴 수정
            .then((response) => {
                setIsLoading(false);
                setAuthorResult(response.data);
                console.log(authorQuery);
            })
            .catch((error) => {
                console.log('API 요청 중 오류 발생:', error);
            });
    }, [setAuthorResult, authorQuery]);

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    // PDF 미리보기 관련 상태
    const [previewVisible, setPreviewVisible] = useState(false);

    // PDF 미리보기 토글 함수
    const togglePreview = async () => {
        setPreviewVisible(!previewVisible);
        if (!previewVisible) {
            const data = await pdf(
                <PdfDocument authorResult={authorResult} />,
            ).toBlob();
            const url = URL.createObjectURL(data);

            // PDF 미리보기를 새창으로 열기
            window.open(url);
        }
    };

    return (
        <div>
            <div className="card card-body ms-4">
                <div className="author-modal-content">
                    <button className='btn btn-success btn-sm' onClick={togglePreview}>Export to PDF</button>
                    <span className="close" onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
                        &times;
                    </span>
                    <hr />
                    <h2>{authorResult.name}</h2>
                    <p>Institution: {authorResult.institution}</p>
                </div>
            </div>
        </div>
    );
}

export default Author;