import React, { useState } from 'react';
import EggNavbar from './Navbar';
import './css/Author.css';

const Dashboard = () => {
    const [instName, setInstName] = useState('');

    const kibanaArticleDashboardURL = 'http://3.35.150.101:5601/goto/766e5a00-6dd1-11ee-8210-1d8145a90f2e';

    const baseURL1 = "http://3.35.150.101:5601/app/dashboards#/view/c5b7c800-6d93-11ee-8210-1d8145a90f2e?embed=true&";
    const baseURL2 = "http://3.35.150.101:5601/app/dashboards#/view/41bea4f0-6ca9-11ee-bcc4-15d4aa6898f0?embed=true&";

    const kibanaInstDashboardURL1 = `${baseURL1}`;
    const kibanaInstDashboardURL2 = `${baseURL2}`;

    console.log(kibanaInstDashboardURL2)


    const handleInstId = (event) => {
        setInstName(event.target.value);
    };

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
                        <select className="form-select form-select-sm mt-2 ms-2 mb-2" aria-label=".form-select-sm example" style={{ width: "300px" }} onChange={handleInstId}>
                            <option selected value="">ALL</option>
                            <option value="영남대학교">영남대학교</option>
                            <option value="서울대학교">서울대학교</option>
                            <option value="건양대학교">건양대학교</option>
                            <option value="대구대학교">대구대학교</option>
                            <option value="한국과학기술원">한국과학기술원</option>
                        </select>
                        <iframe
                            src={kibanaInstDashboardURL1}
                            width="50%"
                            height="600px"
                            title="Kibana Dashboard"
                        ></iframe>
                        <iframe
                            src={kibanaInstDashboardURL2}
                            width="50%"
                            height="600px"
                            title="Kibana Dashboard"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;