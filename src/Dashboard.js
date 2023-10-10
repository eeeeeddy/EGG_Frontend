import React from 'react';
import EggNavbar from './Navbar';

const Dashboard = () => {
    const kibanaDashboardURL = 'http://43.201.21.9:5601/app/dashboards#/view/cb9afad0-6681-11ee-9d67-957404d3de86?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))';

    return (
        <div>
            <div className='Navbar'>
                <EggNavbar />
            </div>

            <iframe
                src={kibanaDashboardURL}
                width="100%"
                height="900px"
                title="Kibana Dashboard"
            ></iframe>
        </div>
    );
};

export default Dashboard;