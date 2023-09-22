import './css/Detail.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EggNavbar from './Navbar';
import * as d3 from 'd3';
import data from './data.json';

function Test() {
    const [detailResult, setDetailResult] = useState([]);
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLeftPageOpen, setIsLeftPageOpen] = useState(true);
    const [highlightedText, setHighlightedText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isShowHelp, setIsShowHelp] = useState(false);
    const svgRef = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null); // 선택한 노드 정보를 저장할 상태 변수
    const initialScale = 1; // 초기 스크롤 배율
    const graphData = data; // graph JSON 데이터
    const nodes = graphData.nodes;

    // useEffect(() => {
    //     const { article_id } = params;

    //     // Spring Boot API 엔드포인트에 GET 요청을 보냅니다.
    //     axios.get(`/search/${article_id}`)
    //         .then((response) => {
    //             // API 응답으로 받은 데이터를 검색 결과로 설정합니다.
    //             setDetailResult([response.data]);
    //             // console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('API 요청 중 오류 발생:', error);
    //         });
    // }, [setDetailResult, params]);

    useEffect(() => {
        // detailResult 데이터가 로드되면 isLoading을 false로 설정
        // 그래프 생성되면 detailResult부분 수정 필요
        if (detailResult.length > 0) {
            setIsLoading(false);
        }
    }, [detailResult]);

    const toggleLeftPage = () => {
        setIsLeftPageOpen(!isLeftPageOpen);
    };

    const clickHelp = () => {
        setIsShowHelp(!isShowHelp)
    }

    // const clickCenter = () => {
    //     클릭 시 그래프 배율 초기화 (그래프 그린 후에 동작 기능 추가하기)
    // }

    // graph 생성
    useEffect(() => {
        const width = 1000;
        const height = 750;

        // SVG 요소 초기화
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .call(d3.zoom().on('zoom', zoomed)); // 줌 이벤트 핸들러 추가

        // SVG 영역에 테두리 추가
        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('stroke', 'black')
            .style('stroke-width', 0);

        // JSON 데이터 로드
        // const graphData = data;

        const simulation = d3.forceSimulation(graphData.nodes)
            .force('link', d3.forceLink(graphData.links).distance(d => d.distance))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide().radius(20));

        const link = svg.selectAll('.link')
            .data(graphData.links)
            .enter().append('line')
            .attr('class', 'link')
            .style('stroke', 'black')  // 간선 색상
            .style('stroke-width', 1); // 간선 두께

        const node = svg.selectAll('.node')
            .data(graphData.nodes)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', d => d.size)
            .style('fill', d => 'lightgrey'); // 노드 색상

        const label = svg.selectAll('.label')
            .data(graphData.nodes)
            .enter().append('text')
            .attr('class', 'label')
            .attr('text-anchor', 'middle')
            .attr('dy', -5) // 이 부분을 음수 값으로 설정하여 텍스트를 상단으로 올릴 수 있음
            .text(d => (d.author_name + ", " + d.pub_year));

        // 노드 위에 마우스를 올렸을 때 hover 효과 및 노드 정보 표시
        node.on('mouseover', (event, d) => {
            setSelectedNode(d);
            d3.select(event.currentTarget)
                .attr('r', d.size + 5) // 노드 크기를 키워 hover 효과 표시
                .style('fill', 'rgba(0, 127, 0, 0.5)') // 색상 및 투명도(0.5)
                .style('stroke', 'gray') // 노드 테두리 색상
                .style('stroke-width', 2); // 노드 테두리 두께
        });

        node.on('mouseout', (event, d) => {
            setSelectedNode(null);
            d3.select(event.currentTarget)
                .attr('r', d.size) // 노드 크기 원래대로 복원
                .style('fill', 'lightgrey') // 색상 원래대로 복원
                .style('stroke-width', 0);
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
            node.attr('r', d => d.size / currentScale);
            label.attr('font-size', 10 / currentScale);
        }

        // 초기 배율 설정
        svg.call(d3.zoom().transform, d3.zoomIdentity.scale(initialScale));
    }, []);

    return (
        <div>
            <div className='Navbar'>
                <EggNavbar />
            </div>

            <div className='row'>

                {/* left-page */}
                <div className='col-md-2 z-1 mt-4'>
                    <div className={`leftPage ${isLeftPageOpen ? 'closed' : 'open'}`} style={{ width: "400px", height: "100%"}}>
                        <div className='pt-1' style={{overflow: "scroll"}}>
                            <div className='d-flex'>
                                {/* 돋보기 이미지 */}
                                <div className='p-2 flex-fill'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="32" fill="currentColor" class="bi bi-search" viewBox="0 -3 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                                {/* 입력창 */}
                                <div className='p-2 flex-fill'>
                                    <input className='form-control me-2' type='search'
                                        autoComplete='off' spellCheck="false"
                                        role='combobox' aria-controls='matches'
                                        aria-expanded='false' aria-live='polite'
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setHighlightedText(e.target.value);
                                        }} />
                                </div>
                                {/* filter 버튼 */}
                                <div className='p-2 flex-fill'>
                                    <button type="button" className='btn btn-success'>FILTER</button>
                                </div>
                            </div>
                            {/* 그래프 그려진 논문 리스트 */}
                            <div className='mt-2' >
                                {/* {detailResult.map((result) => {
                                    if (result.article_id) {
                                        const regex = new RegExp(`(${searchQuery})`, 'gi');
                                        const titleWithHighlight = result.title_ko.replace(
                                            regex,
                                            (match) => `<span class="highlighted">${match}</span>`);
                                        const authorWithHighlight = result.author_name.replace(
                                            regex,
                                            (match) => `<span class="highlighted">${match}</span>`);
                                        const yearWithHighlight = result.pub_year.toString().replace(
                                            regex,
                                            (match) => `<span class="highlighted">${match}</span>`);
                                        const abstractWithHighlight = result.abstract_ko.replace(
                                            regex,
                                            (match) => `<span class="highlighted">${match}</span>`);
                                        return (
                                            <div className="articleList" key={result.article_id}>
                                                <p className='mt-3'>
                                                    <b><span dangerouslySetInnerHTML={{ __html: titleWithHighlight }}></span></b><br />
                                                    <span className='left-page-author' dangerouslySetInnerHTML={{ __html: authorWithHighlight }}></span><br />
                                                    <span className='left-page-year' dangerouslySetInnerHTML={{ __html: yearWithHighlight }}></span><br />
                                                    <span className='paperbox-p' dangerouslySetInnerHTML={{ __html: abstractWithHighlight }}></span>
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                })} */}
                                {
                                    nodes.map((node) => {
                                        if (node.article_id) {
                                            const regex = new RegExp(`(${searchQuery})`, 'gi');
                                            const titleWithHighlight = node.title_ko.replace(
                                                regex,
                                                (match) => `<span class="highlighted">${match}</span>`);
                                            const authorWithHighlight = node.author_name.replace(
                                                regex,
                                                (match) => `<span class="highlighted">${match}</span>`);
                                            const yearWithHighlight = node.pub_year.toString().replace(
                                                regex,
                                                (match) => `<span class="highlighted">${match}</span>`);
                                            const abstractWithHighlight = node.abstract_ko.replace(
                                                regex,
                                                (match) => `<span class="highlighted">${match}</span>`);
                                            return (
                                                <div className="articleList" key={node.article_id}>
                                                    <p className='mt-3'>
                                                        <b><span dangerouslySetInnerHTML={{ __html: titleWithHighlight }}></span></b><br />
                                                        <span className='left-page-author' dangerouslySetInnerHTML={{ __html: authorWithHighlight }}></span><br />
                                                        <span className='left-page-year' dangerouslySetInnerHTML={{ __html: yearWithHighlight }}></span><br />
                                                        <span className='paperbox-p' dangerouslySetInnerHTML={{ __html: abstractWithHighlight }}></span>
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                            </div>
                        </div>
                        <button className='leftButton' onClick={toggleLeftPage}>
                            {isLeftPageOpen ? '◀' : '▶'}
                        </button>
                        <div className="bottomButtonGroup">
                            <div className="row ms-1">
                                <div className="text-center">
                                    <span className="position-relative" id="helpButton" onClick={clickHelp}>
                                        {isShowHelp && (
                                            <div className='card card-body position-absolute' id="helpModal">
                                                <p className='text-start'><strong>How to read the graph</strong></p>
                                                <hr className='mt-0' />
                                                <p className='text-start'>Each node is an academic paper related to the origin paper.</p>
                                                <ul>
                                                    <li className='text-start'>Papers are ~</li>
                                                    <li className='text-start'>Node SIZE is the number of citations</li>
                                                    <li className='text-start'>Node color is the publishing year</li>
                                                </ul>
                                            </div>
                                        )}
                                        <svg className='text-success' width="34" height="34" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                        </svg>
                                    </span>
                                    <div className='mt-2'></div> {/* 버튼 간격을 위한 div 태그 */}
                                    <span className="" id="centerButton">
                                        <svg className='text-success' width="38" height="38" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* graph-section */}
                <div className='col-md-7 z-0'>
                    <div className="svg-container">
                        <div className='graph'>
                            <svg ref={svgRef}></svg>
                        </div>
                    </div>
                </div>

                {/* right-section */}
                <div className='col-md-3 z-0 mt-4 bg-white border-start'>
                    <div className="d-flex justify-content-center me-3">
                        {selectedNode && (
                            <div className='' style={{ width: '420px' }}>
                                <h5 style={{ textAlign: 'left' }}><strong>{selectedNode.title_ko}</strong></h5>
                                <p style={{ textAlign: 'left' }}>{selectedNode.author}</p>
                                <p style={{ textAlign: 'left' }}>{selectedNode.pub_year} {selectedNode.journal_name}</p>
                                <p style={{ textAlign: 'left' }}>{selectedNode.citation} citation</p>
                                <p style={{ textAlign: 'left' }}>{selectedNode.abstract_ko}</p>
                                {/* 다른 노드 정보 필드를 추가할 수 있음 */}
                            </div>
                        )}
                        {/* {detailResult.map((result) => {
                            if (result.article_id) {
                                return (
                                    <div className="" key={result.article_id} style={{ width: '420px' }}>
                                        <h5><strong>{result.title_ko}</strong></h5><br />
                                        <span>{result.author_name}</span><br />
                                        <span>{result.pub_year}, {result.journal_name}</span><br />
                                        <span>{result.citation_count} citaion</span><br />
                                        <br />
                                        <span>{result.abstract_ko}</span><br />
                                        <br />
                                    </div>
                                );
                            }
                            return ''; // 나머지는 표시하지 않음
                        })} */}
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Test;