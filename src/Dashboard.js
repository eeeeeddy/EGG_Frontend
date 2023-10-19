import React, { useEffect, useState } from 'react';
import EggNavbar from './Navbar';
import Select from 'react-select';
import './css/Dashboard.css';
import InstData from './Institution.json';

const Dashboard = () => {
    const [instName, setInstName] = useState('ALL');
    const kibanaArticleDashboardURL = 'http://3.35.150.101:5601/goto/5694c120-6e5c-11ee-bb86-7d90f481f2a7';

    const baseURL1 = 'http://3.35.150.101:5601/app/dashboards#/view/41bea4f0-6ca9-11ee-bcc4-15d4aa6898f0?embed=true&';
    const baseURL2 = 'http://3.35.150.101:5601/app/dashboards#/view/c5b7c800-6d93-11ee-8210-1d8145a90f2e?embed=true&';

    const [kibanaInstDashboardURL1, setKibanaInstDashboardURL1] = useState('http://3.35.150.101:5601/app/dashboards#/view/41bea4f0-6ca9-11ee-bcc4-15d4aa6898f0?embed=true&');
    const [kibanaInstDashboardURL2, setKibanaInstDashboardURL2] = useState('http://3.35.150.101:5601/app/dashboards#/view/c5b7c800-6d93-11ee-8210-1d8145a90f2e?embed=true&');

    useEffect(() => {
        console.log(instName)
        if (instName === 'ALL') {
            setKibanaInstDashboardURL1(`${baseURL1}_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`);
            setKibanaInstDashboardURL2(`${baseURL2}_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`);
        } else {
            setKibanaInstDashboardURL1(`${baseURL1}_g=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'2bcd7090-6c0e-11ee-994a-19c632230212',key:cInst,negate:!f,params:(query:${instName}),type:phrase),query:(match_phrase:(cInst:${instName}))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'2bcd7090-6c0e-11ee-994a-19c632230212',key:c2Inst,negate:!t,params:(query:${instName}),type:phrase),query:(match_phrase:(c2Inst:${instName})))),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`);
            setKibanaInstDashboardURL2(`${baseURL2}_g=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'2bcd7090-6c0e-11ee-994a-19c632230212',key:c2Inst,negate:!f,params:(query:${instName}),type:phrase),query:(match_phrase:(c2Inst:${instName}))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'2bcd7090-6c0e-11ee-994a-19c632230212',key:cInst,negate:!t,params:(query:${instName}),type:phrase),query:(match_phrase:(cInst:${instName})))),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`);
        }
    }, [instName])

    const handleInstId = (selectedOption) => {
        setInstName(selectedOption.value);
    };

    // const options = [
    //     { "value": 'ALL', "label": 'ALL' },
    //     { "value": '영남대학교', "label": '영남대학교' },
    //     { value: '서울대학교', label: '서울대학교' },
    //     { value: '건양대학교', label: '건양대학교' },
    //     { value: '대구대학교', label: '대구대학교' },
    //     { value: '한국과학기술원', label: '한국과학기술원' },
    // ];

    const options = InstData;

    return (
        <div style={{ fontFamily: 'MaruBuri-Regular' }}>
            <div className='Navbar'>
                <EggNavbar />
            </div>
            <div className='ms-3 me-3' style={{ marginTop: "67px" }}>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="article-tab" data-bs-toggle="tab" data-bs-target="#article" type="button" role="tab" aria-controls="article" aria-selected="true">Article</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#institution" type="button" role="tab" aria-controls="institution" aria-selected="false">Institution</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="article" role="tabpanel" aria-labelledby="article-tab">
                        <iframe
                            src={kibanaArticleDashboardURL}
                            width="100%"
                            height="900px"
                            title="Kibana Dashboard"
                        ></iframe>
                    </div>
                    <div class="tab-pane fade" id="institution" role="tabpanel" aria-labelledby="institution-tab">
                        <div>
                            <Select
                                options={options}
                                isSearchable={true} // 검색 기능 활성화
                                placeholder="Select an Institution"
                                onChange={handleInstId}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        width: 300,
                                        marginTop: 10,
                                        marginBottom: 10
                                    }),
                                }}
                            />
                        </div>
                        {/* <select className="form-select form-select-sm mt-2 ms-2 mb-2" aria-label=".form-select-sm example" style={{ width: "300px" }} onChange={handleInstId}>
                            <option value='ALL'>ALL</option>
                            <option value="영남대학교">영남대학교</option>
                            <option value="서울대학교">서울대학교</option>
                            <option value="건양대학교">건양대학교</option>
                            <option value="대구대학교">대구대학교</option>
                            <option value="한국과학기술원">한국과학기술원</option>
                        </select> */}
                        <div>
                            <iframe
                                src={kibanaInstDashboardURL1}
                                width="50%"
                                height="600px"
                            ></iframe>
                            <iframe
                                src={kibanaInstDashboardURL2}
                                width="50%"
                                height="600px"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;