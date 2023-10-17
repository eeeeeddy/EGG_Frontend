import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, Text, pdf, Font } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EggNavbar from './Navbar';
import * as d3 from 'd3';
import Chart from 'chart.js/auto';

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

function Author() {
    const [isLoading, setIsLoading] = useState(true);
    const contentToExportRef = useRef(null);
    const params = useParams();
    const svgRef = useRef(null);
    const initialScale = 1; // 초기 스크롤 배율
    const [selectedNode, setSelectedNode] = useState(null); // 선택한 노드 정보를 저장할 상태 변수
    const [fixedNode, setFixedNode] = useState(null); // 고정된 노드 정보를 저장할 상태 변수
    const [authorData, setAuthorData] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [authorNode, setAuthorNode] = useState([]); // 저자 노드 선언
    const [pubYear, setPubYear] = useState([]);
    const pubYearCount = pubYear.reduce((count, year) => {
        count[year] = (count[year] || 0) + 1;
        return count;
    }, {});
    const [category, setCategory] = useState([]);
    const categoryCount = category.reduce((count, category) => {
        count[category] = (count[category] || 0) + 1;
        return count;
    }, {});

    const pubYearLabels = Object.keys(pubYearCount);
    const pubYearData = Object.values(pubYearCount);

    const categoryLabels = Object.keys(categoryCount);
    const categoryData = Object.values(categoryCount);

    let pubYearBarChartData = {
        labels: pubYearLabels,
        datasets: [{
            label: 'Publication',
            data: pubYearData,
            backgroundColor: '#588157', // 막대 색상
        }],
    };

    let categoryBarChartData = {
        labels: categoryLabels,
        datasets: [{
            label: 'Category',
            data: categoryData,
            backgroundColor: '#588157', // 막대 색상
        }],
    };

    // 발행연도 막대그래프 참조
    const pubYearChartJsCanvasRef = useRef(null);
    let pubYearChartJsChart;

    // 발행연도 막대그래프 참조
    const categoryChartJsCanvasRef = useRef(null);
    let categoryChartJsChart;

    useEffect(() => {
        // URL 파라미터로부터 검색어를 가져옵니다.
        const { authorQuery } = params;

        if (authorQuery === 'loading') {
            setIsLoading(true);
            return;
        }
        setIsLoading(true);

        // Fast API 엔드포인트에 GET 요청을 보냅니다.
        axios.get(`http://15.165.247.85/Author/${params.authorId}`)
            .then((response) => {
                setIsLoading(false);
                console.log("서버에서 받아온 결과", response.data);

                const temp = response.data
                setAuthorData(temp)

                const temp1 = response.data.nodes
                setNodes(temp1)

                const temp2 = response.data.links
                setLinks(temp2)

                const temp3 = response.data.nodes.find(node => node.authorID === params.authorId);
                setAuthorNode(temp3)

                const temp4 = temp3.pubYears
                setPubYear(temp4)

                const temp5 = temp3.category
                setCategory(temp5)
            })
            .catch((error) => {
                setIsLoading(false);
                console.log('API 요청 중 오류 발생:', error);
            });
    }, [params.authorId]);

    useEffect(() => {
        console.log("authorData", authorData);
        console.log("nodes", nodes)
        console.log("links", links)
        console.log("authorNode", authorNode)
        console.log("pubYears", pubYear)
        console.log("category", category)
    }, [authorData, nodes, links, authorNode, pubYear, category])

    // 발행연도 막대그래프 생성
    const createPubYearChartJsGraph = () => {
        // pubYearChartJsCanvasRef.current가 null이 아닌지 확인
        if (pubYearChartJsCanvasRef.current) {
            // 캔버스 요소를 가져와서 그래프 생성
            const pubYearChartJsChart = new Chart(pubYearChartJsCanvasRef.current, {
                type: 'bar',
                data: pubYearBarChartData,
            });
        }
    };

    useEffect(() => {
        createPubYearChartJsGraph();
    }, [pubYear]); // Chart.js 그래프 생성

    const createCategoryChartJsGraph = () => {
        // categoryChartJsCanvasRef.current가 null이 아닌지 확인
        if (categoryChartJsCanvasRef.current) {
            // 캔버스 요소를 가져와서 그래프 생성
            const categoryChartJsChart = new Chart(categoryChartJsCanvasRef.current, {
                type: 'bar',
                data: categoryBarChartData,
            });
        }
    };

    useEffect(() => {
        createCategoryChartJsGraph();
    }, [category]); // Chart.js 그래프 생성

    const handleExportToPDF = () => {
        const elementToExport = contentToExportRef.current;

        // HTML2Canvas를 사용하여 요소를 이미지로 캡처
        html2canvas(elementToExport, {
            scale: 1.5, // 캡쳐된 이미지 배율 조절 (30% 크기)
        }).then((canvas) => {
            // 이미지 데이터를 가져옴
            const imgData = canvas.toDataURL('image/png');

            // jsPDF를 사용하여 PDF 생성
            const pdf = new jsPDF('1', 'mm', [297, 210]);
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

            // PDF 저장
            pdf.save('exported-content.pdf');

            // PDF를 새 창으로 열기
            // const newWindow = window.open('', '_blank');
            // newWindow.document.open();
            // newWindow.document.write('<html><body>');
            // newWindow.document.write('<embed width="100%" height="100%" name="plugin" src="' + pdf.output('datauristring') + '" type="application/pdf">');
            // newWindow.document.write('</body></html>');
            // newWindow.document.close();
        });
    };

    // graph 생성
    useEffect(() => {
        const width = 900;
        const height = 750;

        // SVG 요소 초기화
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .call(d3.zoom().on('zoom', zoomed)); // 줌 이벤트 핸들러 추가

        svg.selectAll(".nodes").remove();
        svg.selectAll(".links").remove();

        // SVG 영역에 테두리 추가
        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('stroke', 'black')
            .style('stroke-width', 0);

        // node size = (d.citation + 5) * 3
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).distance(d => d.distance))
            .force('charge', d3.forceManyBody().strength(-1700)) // 그래프 퍼진 정도
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide().radius(20));

        const link = svg.selectAll('.link')
            .data(links)
            .enter().append('line')
            .attr('class', 'link')
            .style('stroke', 'rgba(0, 0, 0, 0.2')  // 간선 색상
            .style('stroke-width', 1); // 간선 두께

        const node = svg.selectAll('.node')
            .data(nodes)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', d => d.impactfactor + 5)
            .style('fill', d => 'rgba(163, 177, 138, 0.7)') // 노드 색상
            .style('stroke', d => 'rgba(163, 177, 138, 0.7)');

        const label = svg.selectAll('.label')
            .data(nodes)
            .enter().append('text')
            .attr('class', 'label')
            .attr('text-anchor', 'middle')
            .attr('dy', -10) // 이 부분을 음수 값으로 설정하여 텍스트를 상단으로 올릴 수 있음
            .style('font-size', '12px') // 텍스트의 크기를 10px로 설정 (원하는 크기로 변경)
            .text(d => (d.author1Name.split(',')[0] + ", " + d.author1Inst));

        // 노드 위에 마우스를 올렸을 때 hover 효과 및 노드 정보 표시
        node.on('mouseover', (event, d) => {
            setSelectedNode(d);
            d3.select(event.currentTarget)
                .attr('r', d.impactfactor) // 노드 크기를 키워 hover 효과 표시
                .style('fill', 'rgba(163, 177, 138, 0.7)') // 색상 및 투명도(0.5)
                .style('stroke', 'rgba(255, 51, 51, 0.5') // 노드 테두리 색상
                .style('stroke-width', 3); // 노드 테두리 두께
        });

        node.on('mouseout', (event, d) => {
            if (d !== fixedNode) {
                setSelectedNode(null);
                d3.select(event.currentTarget)
                    .attr('r', d.impactfactor) // 노드 크기 원래대로 복원
                    .style('fill', 'rgba(163, 177, 138, 0.7)') // 색상 원래대로 복원
                    .style('stroke-width', 0);
            }
        });

        // 노드 클릭 시 고정된 노드 정보 업데이트
        node.on('click', (event, d) => {
            setFixedNode(d);
        });

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            label
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });

        // 줌 이벤트 핸들러
        function zoomed(event) {
            const { transform } = event;
            svg.attr('transform', transform); // 현재 변환을 SVG에 적용

            // 현재 줌 레벨 가져오기
            const currentScale = transform.k;

            // 배율을 통해 원하는 작업을 수행할 수 있습니다.
            // 예: 노드와 연결된 요소 크기 조정
            node.attr('r', d => ((d.impactfactor) / currentScale));
            label.attr('font-size', 10 / currentScale);
        }

        // 초기 배율 설정
        svg.call(d3.zoom().transform, d3.zoomIdentity.scale(initialScale));

        simulation.alpha(1).restart();
        console.log("메인")
    }, [links, nodes]);

    const ClickOpenKCI = (author_id) => {
        const kciUrl = `https://www.kci.go.kr/kciportal/po/citationindex/poCretDetail.kci?citationBean.cretId=` + author_id

        // 새 창으로 KCI 링크 열기
        window.open(kciUrl);
    }

    return (
        <div style={{fontFamily:'MaruBuri-Regular'}}>

            <div className='Navbar'>
                <EggNavbar />
            </div>

            <div className='row mt-5 contentToExport' ref={contentToExportRef}>
                {/* left section */}
                <div className='col-md-4 mt-4 border-end' style={{ maxHeight: '900px', overflowY: 'auto' }}>
                    <div className="ms-3" style={{ overflow: 'scroll' }}>
                        <button className='btn btn-success btn-sm ms-1' onClick={handleExportToPDF}>Export to PDF</button>
                        <button className='btn btn-success btn-sm ms-1'>Dashboard</button>
                        <button className='btn btn-success btn-sm ms-1' onClick={() => ClickOpenKCI(params.authorId)}>Open KCI</button>
                        {/* <button className='btn btn-success btn-sm ms-1'>Filter</button> */}
                        <hr />
                        {isLoading ? (
                            <div className="spinner-border text-success" role="status"></div>
                        ) : (
                            // contentToExportRef에 ref를 추가하여 내용을 참조
                            <div >
                                <h2>{authorNode.author1Name}</h2>
                                <a>{authorNode.author1Inst}</a>
                                <br />
                                <a>Total Cited: {authorNode.impactfactor}</a>
                                <br />
                                <a>Average Cited: {authorNode.articleIDs.length === 0 ? 0 : (authorNode.impactfactor / authorNode.articleIDs.length).toFixed(2)}</a>
                                <br />
                                <a>H-Index: {authorNode.H_index}</a>
                                <a>Total Paper: {authorNode.articleIDs.length}</a>
                                <br />
                                <div>
                                    <span>Paper : </span>
                                    <br />
                                    {[...new Set(authorNode.titleKor)].map((title, index) => (
                                        <React.Fragment key={index}>
                                            - {title}
                                            {index < authorNode.titleKor.length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <hr />
                                <h5>Word Cloud</h5>
                                <p>
                                    {[...new Set(authorNode.word_cloud)].map((word, index) => (
                                        <button className='btn btn-primary btn-sm me-1 mt-1' style={{backgroundColor:"#A3B18A", borderColor:"#A3B18A"}} key={index}>{word}</button>
                                    ))}
                                </p>
                                <hr />
                                <h5>Publish Year</h5>
                                <canvas ref={pubYearChartJsCanvasRef} style={{ maxWidth: '100%' }}></canvas>
                                <hr />
                                <h5>Category</h5>
                                <canvas ref={categoryChartJsCanvasRef} style={{ maxWidth: '100%' }}></canvas>
                                <hr />
                            </div>
                        )}
                    </div>
                </div>

                {/* Graph section */}
                <div className='col-md-8'>
                    <div className="svg-container">
                        <div className='graph' style={{marginTop:"100px"}}>
                            {isLoading ? (
                                <div className="spinner-border text-success mt-5" role="status"></div>
                            ) : (
                                <svg ref={svgRef}></svg>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Author;