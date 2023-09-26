import React, { useEffect, useState } from 'react';
import { Document, Page, Text, pdf } from '@react-pdf/renderer';
import axios from 'axios';

const PdfDocument = ({ authorResult }) => {
    return (
        <Document>
            <Page>
                <Text>
                    <Text>{authorResult.name}</Text>
                    <Text><br /></Text>
                    <Text>Institution: {authorResult.institution}</Text>
                    <Text>Total Paper: </Text>
                    <Text>Total Cited: </Text>
                    <Text>Average Cited: </Text>
                    <Text>H-Index: </Text>
                    <Text><hr /></Text>
                    <Text><h5>키워드 클라우드</h5></Text>
                    <Text><hr /></Text>
                    <Text><h5>Author Graph</h5></Text>
                    {/* 다른 정보를 추가할 때도 각각의 <Text> 컴포넌트로 감싸야 합니다. */}
                </Text>
            </Page>
        </Document>
    );
};

function Author({ authorId, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authorResult, setAuthorResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authorId === 'loading') {
            setIsLoading(true);
            return;
        }

        setIsLoading(true);

        axios.get(`/author/${authorId}`)
            .then((response) => {
                setIsLoading(false);
                setAuthorResult(response.data);
            })
            .catch((error) => {
                console.log('API 요청 중 오류 발생:', error);
            });
    }, [authorId]);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    const [previewVisible, setPreviewVisible] = useState(false);

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
                    {isLoading ? (
                        <div className="spinner-border text-success" role="status"></div>
                    ) : (
                        <>
                            <h2>{authorResult.name}</h2>
                            <p>{authorResult.institution}</p>
                            <p>Total Paper: </p>
                            <p>Total Cited: </p>
                            <p>Average Cited: </p>
                            <p>H-Index: </p>
                            <hr />
                            <h5>키워드 클라우드</h5>
                            <hr />
                            <h5>Author Graph</h5>
                            {/* 다른 정보를 모달에 추가할 수 있음 */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Author;