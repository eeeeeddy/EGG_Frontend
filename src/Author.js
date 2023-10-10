import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, Text, pdf, Font } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EggNavbar from './Navbar';

// const PdfDocument = ({ authorResult }) => {
//     return (
//         <Document>
//             <Page>
//                 <Text>
//                     <Text>{authorResult.name}</Text>
//                     <Text><br /></Text>
//                     <Text>Institution: {authorResult.institution}</Text>
//                     <Text>Total Paper: </Text>
//                     <Text>Total Cited: </Text>
//                     <Text>Average Cited: </Text>
//                     <Text>H-Index: </Text>
//                     <Text><hr /></Text>
//                     <Text><h5>키워드 클라우드</h5></Text>
//                     <Text><hr /></Text>
//                     <Text><h5>Author Graph</h5></Text>
//                     {/* 다른 정보를 추가할 때도 각각의 <Text> 컴포넌트로 감싸야 합니다. */}
//                 </Text>
//             </Page>
//         </Document>
//     );
// };

function Author({ authorId, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authorResult, setAuthorResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const contentToExportRef = useRef(null);
    const params = useParams();

    useEffect(() => {
        if (authorId === 'loading') {
            setIsLoading(true);
            return;
        }

        setIsLoading(true);

        axios.get(`http://localhost:8080/author/${params.authorId}`)
            .then((response) => {
                setIsLoading(false);
                setAuthorResult(response.data);
            })
            .catch((error) => {
                console.log('API 요청 중 오류 발생:', error);
            });
    }, [params.authorId]);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    const handleExportToPDF = () => {
        const elementToExport = contentToExportRef.current;

        // HTML2Canvas를 사용하여 요소를 이미지로 캡처
        html2canvas(elementToExport, {
            scale: 1.5, // 캡쳐된 이미지 배율 조절 (30% 크기)
        }).then((canvas) => {
            // 이미지 데이터를 가져옴
            const imgData = canvas.toDataURL('image/png');
            
            // jsPDF를 사용하여 PDF 생성
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            
            // PDF 저장
            // pdf.save('exported-content.pdf');

            // PDF를 새 창으로 열기
            const newWindow = window.open('', '_blank');
            newWindow.document.open();
            newWindow.document.write('<html><body>');
            newWindow.document.write('<embed width="100%" height="100%" name="plugin" src="' + pdf.output('datauristring') + '" type="application/pdf">');
            newWindow.document.write('</body></html>');
            newWindow.document.close();
        });
    };


    return (
        <div>

            <div className='Navbar'>
                <EggNavbar />
            </div>

            <div className='row'>
                {/* left section */}
                <div className='col-md-3 mt-4 border-end' style={{ maxHeight: '900px', overflowY: 'auto' }}>
                    <div className="ms-2">
                        <button className='btn btn-success btn-sm ms-1' onClick={handleExportToPDF}>Export to PDF</button>
                        <button className='btn btn-success btn-sm ms-1'>Filter</button>
                        <hr />
                        {isLoading ? (
                            <div className="spinner-border text-success" role="status"></div>
                        ) : (
                            // contentToExportRef에 ref를 추가하여 내용을 참조
                            <div className='contentToExport' ref={contentToExportRef}>
                                <h2>{authorResult.name}</h2>
                                <p>{authorResult.institution}</p>
                                <p>Total Paper: </p>
                                <p>Total Cited: </p>
                                <p>Average Cited: </p>
                                <p>H-Index: </p>
                                <hr />
                                <h5>키워드 클라우드</h5>
                                <hr />
                                <h5>추가 시각화 정보</h5>
                                {/* 다른 정보를 모달에 추가할 수 있음 */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Graph section */}
                <div className='col-md-9 mt-4'>
                    <h1>Graph Section</h1>
                </div>
            </div>
        </div>
    );
}

export default Author;