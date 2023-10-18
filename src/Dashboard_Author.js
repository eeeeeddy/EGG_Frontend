import React from 'react';
import EggNavbar from './Navbar';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
    const params = useParams();

    const baseURL1 ='http://3.35.150.101:5601/app/dashboards#/view/6ab7fe60-6ca9-11ee-bcc4-15d4aa6898f0?embed=true&';
    const baseURL2 ='http://3.35.150.101:5601/app/dashboards#/view/3b73c950-6cad-11ee-bcc4-15d4aa6898f0?embed=true&';

    // 동적으로 입력값을 사용하여 URL을 생성
    const kibanaDashboardURL1 = `${baseURL1}_g=(filters:!(('$state':(store:globalState),meta:(alias:!n,disabled:!f,index:'0c7b2e20-6caf-11ee-bcc4-15d4aa6898f0',key:author1ID,negate:!f,params:(query:${params.authorId}),type:phrase),query:(match_phrase:(author1ID:${params.authorId})))),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`;
    const kibanaDashboardURL2 = `${baseURL2}_g=(filters:!(('$state':(store:globalState),meta:(alias:!n,disabled:!f,index:'0c7b2e20-6caf-11ee-bcc4-15d4aa6898f0',key:author2IDs,negate:!f,params:(query:${params.authorId}),type:phrase),query:(match_phrase:(author2IDs:${params.authorId})))),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`;
    
    console.log(params.authorId);

    return (
        <div>
            <div className="Navbar">
                <EggNavbar />
            </div>
            <div className="main" style={{ marginTop: '62px' }}>
                <iframe
                    src={kibanaDashboardURL1}
                    width="100%"
                    height="400px"
                    title="Kibana Dashboard"
                ></iframe>
                <iframe
                    src={kibanaDashboardURL2}
                    width="100%"
                    height="400px"
                    title="Kibana Dashboard"
                ></iframe>
            </div>
        </div>
    );
};

export default Dashboard;
