import React, { useState } from 'react';
import { Document, Page, pdf } from '@react-pdf/renderer';

const PdfDocument = ({ authorInfo }) => {
    return (
        <Document>
            <Page>
                {/* PDF에 표시할 컨텐츠를 여기에 추가 */}
                <h2>{authorInfo.authorName}</h2>
                <p>Publication Year: {authorInfo.pubYear}</p>
                <p>Journal: {authorInfo.journalName}</p>
                <p>Citation: {authorInfo.citation}</p>
                <p>Abstract:</p>
                <p>{authorInfo.abstract}</p>
                {/* 다른 저자 정보 필드를 추가할 수 있음 */}
            </Page>
        </Document>
    );
};

function Author({ author_id, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const authorInfo = {
        authorName: 'John Doe',
        pubYear: 2023,
        journalName: 'Sample Journal',
        citation: 50,
        abstract: 'This is a sample abstract for the author.',
    };

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    const [previewVisible, setPreviewVisible] = useState(false);
    const [pdfData, setPdfData] = useState(null);

    const togglePreview = async () => {
        setPreviewVisible(!previewVisible);
        if (!previewVisible) {
            const data = await pdf(
                <PdfDocument authorInfo={authorInfo} />,
            ).toBlob();
            const url = URL.createObjectURL(data);

            // pdf 미리보기를 새창으로 열기
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
                    <h2>{authorInfo.authorName}</h2>
                    <p>Publication Year: {authorInfo.pubYear}</p>
                    <p>Journal: {authorInfo.journalName}</p>
                    <p>Citation: {authorInfo.citation}</p>
                    <p>Abstract:</p>
                    <p>{authorInfo.abstract}</p>

                </div>
            </div>
        </div>
    );
}

export default Author;
