
import './css/Detail.css';
import React, { useState, useEffect, useRef } from 'react';
import EggNavbar from './Navbar';
import * as d3 from 'd3';
import data from './data.json';

function Detail_FilterTest() {
    const svgRef = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null); // 선택한 노드 정보를 저장할 상태 변수
    const [fixedNode, setFixedNode] = useState(null); // 고정된 노드 정보를 저장할 상태 변수
    const initialScale = 1; // 초기 스크롤 배율
    const graphData = data; // graph JSON 데이터
    const nodes = graphData.nodes;
    const links = graphData.links;
    const [publishYear, setPublishYear] = useState(2024);
    const [category, setCategory] = useState("default");
    const [mainAuthor, setMainAuthor] = useState("default");
    const [citation, setCitation] = useState(-1);
    const [journalName, setjournalName] = useState("default");

    // 그래프 색상 관련 변수
    const defaultEdgeColor = 'rgba(0, 0, 0, 0.2)';
    const defaultNodeColor = 'rgba(88, 129, 87, 0.7)';
    const selectedNodeColor = 'rgba(255, 159, 28, 0.8)';
    const hoverDefaultNodeColor = 'rgba(8, 28, 21, 0.8)';
    const hoverSelectedNodeColor = 'rgba(232, 93, 4, 0.8)';
    const filteredNodeColor = 'rgba(255, 51, 51, 0.7)';
    const yearColor = ['rgba(88, 129, 87, 0.1)', 'rgba(88, 129, 87, 0.3)', 'rgba(88, 129, 87, 0.5)', 'rgba(58, 90, 64, 0.6)', 'rgba(58, 90, 64, 0.9)'];


    const handlePublishYear = (event) => {
        const temp = event.target.value;
        setPublishYear(parseInt(temp));
    }

    const handleCategory = (event) => {
        const temp = event.target.value;
        setCategory(temp);
    }

    const handleMainAuthor = (event) => {
        const temp = event.target.value;
        setMainAuthor(temp);
    }

    const handleJournalName = (event) => {
        const temp = event.target.value;
        setjournalName(temp);
    }

    const handleCitation = (event) => {
        const temp = event.target.value;
        setCitation(parseInt(temp));
    }

    const handleResetZoom = () => {
        // svg 요소를 선택하고 zoom 객체를 사용하여 초기 상태로 리셋
        d3.select(svgRef.current)
            .transition()
            .duration(750)
            .attr("transform", d3.zoomIdentity);

        console.log("Resetting zoom:", d3.select(svgRef.current).property('__zoom'));
    }

    const handleGraphFilter = () => {

        const width = 1500;
        const height = 600;

        // 해당 코드 추가: 이전 노드와 링크를 제거
        d3.select(svgRef.current).selectAll('.node').remove();
        d3.select(svgRef.current).selectAll('.link').remove();
        d3.select(svgRef.current).selectAll('.label').remove();

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

        const simulation = d3.forceSimulation(graphData.nodes)
            .force('link', d3.forceLink(graphData.links).distance(d => d.distance))
            .force('charge', d3.forceManyBody().strength(-1700))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide().radius(20));

        const link = svg.selectAll('.link')
            .data(links)
            .enter().append('line')
            .attr('class', 'link')
            .style('stroke', defaultEdgeColor)  // 간선 색상
            .style('stroke-width', 1); // 간선 두께

        const node = svg.selectAll('.node')
            .data(nodes)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', d => (d.citation + 5) * 3)
            .style('fill', (d) => { // 노드 색상
                if (d.origin_check !== 0) {
                    return selectedNodeColor;
                } else if (d.pub_year >= 2000 && d.pub_year <= 2005) {
                    return yearColor[0]
                } else if (d.pub_year > 2005 && d.pub_year <= 2010) {
                    return yearColor[1]
                } else if (d.pub_year > 2010 && d.pub_year <= 2015) {
                    return yearColor[2]
                } else if (d.pub_year > 2015 && d.pub_year <= 2020) {
                    return yearColor[3]
                } else {
                    return yearColor[4]
                }
            })
            .style('stroke', (d) => {
                if (d.pub_year > publishYear || d.category == category || d.author_name == mainAuthor || d.citation == citation || d.journal_name == journalName) {
                    return filteredNodeColor; // 두 조건이 모두 충족될 때의 테두리 색상
                } else if (d.origin_check !== 0) {
                    return selectedNodeColor; // 조건이 충족되지 않을 때의 테두리 색상
                } else {
                    return defaultNodeColor;
                }
            })
            .style('stroke-width', (d) => {
                if (d.pub_year > publishYear || d.category == category || d.author_name == mainAuthor || d.citation == citation || d.journal_name == journalName) {
                    return 3; // 두 조건이 모두 충족될 때의 테두리 색상
                } else {
                    return 0;
                }
            })

        const label = svg.selectAll('.label')
            .data(graphData.nodes)
            .enter().append('text')
            .attr('class', 'label')
            .attr('text-anchor', 'middle')
            .attr('dy', -10) // 이 부분을 음수 값으로 설정하여 텍스트를 상단으로 올릴 수 있음
            .style('font-size', '12px') // 텍스트의 크기를 10px로 설정 (원하는 크기로 변경)
            .text(d => (d.author_name.split(',')[0] + ", " + d.pub_year));

        // 노드 위에 마우스를 올렸을 때 hover 효과 및 노드 정보 표시
        node.on('mouseover', (event, d) => {
            setSelectedNode(d);
            d3.select(event.currentTarget)
                .attr('r', (d.citation + 5) * 3 + 5) // 노드 크기를 키워 hover 효과 표시
                .style('fill', d => {
                    if (d.origin_check != 0) { // 색상 및 투명도(0.5)
                        return hoverSelectedNodeColor;
                    } else {
                        return hoverDefaultNodeColor;
                    }
                })
        });

        node.on('mouseout', (event, d) => {
            if (d !== fixedNode) {
                setSelectedNode(null);
                d3.select(event.currentTarget)
                    .attr('r', (d.citation + 5) * 3) // 노드 크기 원래대로 복원
                    .style('fill', (d) => { // 노드 색상
                        if (d.origin_check != 0) {
                            return selectedNodeColor;
                        } else if (d.pub_year >= 2000 && d.pub_year <= 2005) {
                            return yearColor[0]
                        } else if (d.pub_year > 2005 && d.pub_year <= 2010) {
                            return yearColor[1]
                        } else if (d.pub_year > 2010 && d.pub_year <= 2015) {
                            return yearColor[2]
                        } else if (d.pub_year > 2015 && d.pub_year <= 2020) {
                            return yearColor[3]
                        } else {
                            return yearColor[4]
                        }
                    })
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
            // node.attr('r', d => d.size);
            label.attr('font-size', 10 / currentScale);
        }

        console.log("필터링 적용")
    }

    function createGraph() {

    }

    // graph 생성
    useEffect(() => {
        const width = 1500;
        const height = 600;
        const minZoom = 0.75;
        const maxZoom = 1.5;

        // SVG 요소 초기화
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .call(d3.zoom()
                .scaleExtent([minZoom, maxZoom]) // 최소 및 최대 줌 레벨 설정
                .translateExtent([[0, 0], [width + 90, height + 100]]) // 이동 가능 범위 설정
                .on('zoom', zoomed)); // 줌 이벤트 핸들러 추가

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
            .style('stroke', defaultEdgeColor)  // 간선 색상
            .style('stroke-width', 1); // 간선 두께

        const node = svg.selectAll('.node')
            .data(nodes)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', d => (d.citation + 5) * 3)
            .style('fill', (d) => { // 노드 색상
                if (d.origin_check !== 0) {
                    return selectedNodeColor;
                } else if (d.pub_year >= 2000 && d.pub_year <= 2005) {
                    return yearColor[0]
                } else if (d.pub_year > 2005 && d.pub_year <= 2010) {
                    return yearColor[1]
                } else if (d.pub_year > 2010 && d.pub_year <= 2015) {
                    return yearColor[2]
                } else if (d.pub_year > 2015 && d.pub_year <= 2020) {
                    return yearColor[3]
                } else {
                    return yearColor[4]
                }
            })
            .style('stroke', (d) => {
                if (d.pub_year > publishYear || d.category == category || d.author_name == mainAuthor || d.citation == citation || d.journal_name == journalName) {
                    return filteredNodeColor; // 두 조건이 모두 충족될 때의 테두리 색상
                } else if (d.origin_check !== 0) {
                    return selectedNodeColor; // 조건이 충족되지 않을 때의 테두리 색상
                } else {
                    return defaultNodeColor;
                }
            })
            .style('stroke-width', (d) => {
                if (d.pub_year > publishYear || d.category == category || d.author_name == mainAuthor || d.citation == citation || d.journal_name == journalName) {
                    return 3; // 두 조건이 모두 충족될 때의 테두리 색상
                } else {
                    return 0;
                }
            })

        const label = svg.selectAll('.label')
            .data(nodes)
            .enter().append('text')
            .attr('class', 'label')
            .attr('text-anchor', 'middle')
            .attr('dy', -10) // 이 부분을 음수 값으로 설정하여 텍스트를 상단으로 올릴 수 있음
            .style('font-size', '12px') // 텍스트의 크기를 10px로 설정 (원하는 크기로 변경)
            .text(d => (d.author_name.split(',')[0] + ", " + d.pub_year));

        // 노드 위에 마우스를 올렸을 때 hover 효과 및 노드 정보 표시
        node.on('mouseover', (event, d) => {
            setSelectedNode(d);
            d3.select(event.currentTarget)
                .attr('r', (d.citation + 5) * 3 + 5) // 노드 크기를 키워 hover 효과 표시
                .style('fill', d => {
                    if (d.origin_check != 0) { // 색상 및 투명도(0.5)
                        return hoverSelectedNodeColor;
                    } else {
                        return hoverDefaultNodeColor;
                    }
                })
        });

        node.on('mouseout', (event, d) => {
            if (d !== fixedNode) {
                setSelectedNode(null);
                d3.select(event.currentTarget)
                    .attr('r', (d.citation + 5) * 3) // 노드 크기 원래대로 복원
                    .style('fill', (d) => { // 노드 색상
                        if (d.origin_check != 0) {
                            return selectedNodeColor;
                        } else if (d.pub_year >= 2000 && d.pub_year <= 2005) {
                            return yearColor[0]
                        } else if (d.pub_year > 2005 && d.pub_year <= 2010) {
                            return yearColor[1]
                        } else if (d.pub_year > 2010 && d.pub_year <= 2015) {
                            return yearColor[2]
                        } else if (d.pub_year > 2015 && d.pub_year <= 2020) {
                            return yearColor[3]
                        } else {
                            return yearColor[4]
                        }
                    })
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
            node.attr('r', d => ((d.citation + 5) * 3) / currentScale);
            label.attr('font-size', 10 / currentScale);
        }

        console.log("초기 그래프")
        console.log("Initial zoom:", d3.select(svgRef.current).property('__zoom'));

    }, []);

    return (
        <div>
            <div className='Navbar'>
                <EggNavbar />
            </div>
            <div style={{ height: "40px" }}></div>
            <div className='row'>
                {/* graph-section */}
                <div className='col-md-12'>
                    {/* filter */}
                    <div className='col-md-9 mt-4' id="filterBar" style={{ marginLeft: "12rem" }}> {/* 마진 부여 수정 필요 */}
                        <div className='row g-2'>
                            <div className="col-md">
                                <form className=''>
                                    <input className="form-control form-control-sm" type="text" id="mainAuthor" placeholder="Main Author" onChange={handleMainAuthor} />
                                </form>
                            </div>
                            <div className='col-md'>
                                <form className=''>
                                    <input className="form-control form-control-sm" type="text" id="citationNumber" placeholder="Citation" onChange={handleCitation} />
                                </form>
                            </div>
                            <div className='col-md'>
                                <div className="">
                                    <select className="form-select" id="publishYear" onChange={handlePublishYear} value={publishYear}>
                                        <option selected value="9999">Publish Year</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                        <option value="2021">2021</option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option>
                                        <option value="2018">2018</option>
                                        <option value="2017">2017</option>
                                        <option value="2016">2016</option>
                                        <option value="2015">2015</option>
                                        <option value="2014">2014</option>
                                        <option value="2013">2013</option>
                                        <option value="2012">2012</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row g-2 mt-2'>
                            <div className='col-md'>
                                <div className="">
                                    <select className="form-select" id="category" onChange={handleCategory} value={category}>
                                        <option selected value="default">Category</option>
                                        <option value="ML">Machine Learning</option>
                                        <option value="Network">Network</option>
                                        <option value="Databases">Databases</option>
                                        <option value="Software">Software</option>
                                        <option value="Operating System">Operating System</option>
                                        <option value="Computer Vision">Computer Vision</option>
                                        <option value="Security">Security</option>
                                        <option value="Graphics">Graphics</option>
                                        <option value="Computation">Computation</option>
                                        <option value="Hardware">Hardware</option>
                                        <option value="Programming Language">Programming Language</option>
                                        <option value="Data Structure">Data Structure</option>
                                        <option value="Robotics">Robotics</option>
                                        <option value="Mathematics">Mathematics</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md'>
                                <div className="">
                                    <select className="form-select" id="journalName" onChange={handleJournalName} value={journalName}>
                                        <option selected value="default">Journal Name</option>
                                        <option value="한국데이터정보과학회지">한국 데이터 정보 과학회지</option>
                                        <option value="정보과학회 컴퓨팅의 실제 논문지">정보과학회 컴퓨팅의 실제 논문지</option>
                                        <option value="정보과학회논문지">정보과학회논문지</option>
                                        <option value="정보과학회논문지 : 소프트웨어 및 응용">정보과학회논문지 : 소프트웨어 및 응용</option>
                                        <option value="정보과학회논문지 : 시스템 및 이론">정보과학회논문지 : 시스템 및 이론</option>
                                        <option value="정보과학회논문지 : 정보통신">정보과학회논문지 : 정보통신</option>
                                        <option value="정보과학회논문지 : 데이타베이스">정보과학회논문지 : 데이타베이스</option>
                                        <option value="데이타베이스연구">데이타베이스연구</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md'>
                                <div className="form-floating">
                                    <button className='btn btn-success' type='button' onClick={handleGraphFilter} >Apply</button>
                                </div>
                            </div>
                            <div className='col-md'>
                                <button className='btn btn-success' type='button' onClick={handleResetZoom}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* graph */}
                <div className="svg-container" style={{ overflow: "hidden" }}>
                    <div className='graph'>
                        <svg ref={svgRef}></svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Detail_FilterTest;