import React, { useEffect, useState } from 'react';
import EggNavbar from './Navbar';
import { useParams } from 'react-router-dom';
import jsonquery1 from './dashboard_author1.json';
import jsonquery2 from './dashboard_author2.json';

const Dashboard = () => {
    const params = useParams();

    const baseURL1 = "http://3.35.150.101:5601/app/dashboards#/view/6ab7fe60-6ca9-11ee-bcc4-15d4aa6898f0?embed=true&";
    const baseURL2 = "http://3.35.150.101:5601/app/dashboards#/view/3b73c950-6cad-11ee-bcc4-15d4aa6898f0?embed=true&";

    // console.log(encodedQueryParams1)
    // console.log(encodedQueryParams2)

    console.log("default", jsonquery1._a.filters[0].meta.params.query)
    console.log("default", jsonquery1._a.filters[0].query.match_phrase.author1ID);

    jsonquery1._a.filters[0].meta.params.query = params.authorId;
    jsonquery1._a.filters[0].query.match_phrase.author1ID = params.authorId;

    console.log("now", jsonquery1._a.filters[0].meta.params.query)
    console.log("now", jsonquery1._a.filters[0].query.match_phrase.author1ID);

    // URL 인코딩 적용
    const encodedQueryParams1 = encodeURIComponent(JSON.stringify(jsonquery1));
    const encodedQueryParams2 = encodeURIComponent(JSON.stringify(jsonquery2));

    const kibanaDashboardURL1 = `${baseURL1}${encodedQueryParams1}`;
    const kibanaDashboardURL2 = `${baseURL2}${encodedQueryParams2}`;

    // console.log(encodedQueryParams1)
    // console.log(encodedQueryParams2)

    useEffect(() => {
        // URL 파라미터로부터 검색어를 가져옵니다.
        const { authorQuery } = params;

        console.log(params.authorId)
    }, []);

    return (
        <div>
            <div className='Navbar'>
                <EggNavbar />
            </div>
            <div className='main' style={{ marginTop: "62px" }}>
                <iframe
                    src={kibanaDashboardURL1}
                    width="100%"
                    height="530px"
                    title="Kibana Dashboard"
                ></iframe>
                <iframe
                    src={kibanaDashboardURL2}
                    width="100%"
                    height="530px"
                    title="Kibana Dashboard"
                ></iframe>
            </div>
        </div>
    );
};

export default Dashboard;