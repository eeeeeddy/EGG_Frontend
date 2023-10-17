import React from 'react';
import EggNavbar from './Navbar';

const Dashboard = () => {
    //const kibanaDashboardURL = 'http://3.35.150.101:5601/app/dashboards#/view/c3722570-674b-11ee-9c7c-191f0524dd00?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&show-top-menu=true&show-query-input=true&show-time-filter=true';
    const kibanaDashboardURL = 'http://3.35.150.101:5601/goto/428743f0-6cdc-11ee-bcc4-15d4aa6898f0'

    return (
        <div>
            <div className='Navbar'>
                <EggNavbar />
            </div>
            <div className='main' style={{marginTop:"62px"}}>
                <iframe
                    src={kibanaDashboardURL}
                    width="100%"
                    height="900px"
                    title="Kibana Dashboard"
                ></iframe>
            </div>
        </div>
    );
};

export default Dashboard;