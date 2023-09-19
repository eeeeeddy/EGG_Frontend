import './css/About.css';
import React from 'react';
import EggNavbar from './Navbar';

function About() {

    return (

        <div>
            <div className='Navbar'>
                <EggNavbar />
            </div>

            <div className='position-absolute top-50 start-50 translate-middle w-50 mt-5'>
                <div className='mt-5'></div>
                <p>To see the latest updates, check out our Full Release Notes.</p>
                <hr />
                <p>Connected Papers is a unique, visual tool to help researchers and applied scientists find and explore papers relevant to their field of work.</p>
                <h4>How does it work?</h4>
                <ul>
                    <li><strong>To create each graph, we analyze an order of ~50,000 papers</strong> and select the few dozen with the strongest connections to the origin paper.</li>
                    <li>In the graph, <strong>papers are arranged according to their similarity.</strong> That means that even papers that do not directly cite each other can be strongly connected and very closely positioned. Connected Papers is not a citation tree.</li>
                    <li>Our similarity metric is based on the concepts of <strong>Co-citation and Bibliographic Coupling.</strong> According to this measure, two papers that have highly overlapping citations and references are presumed to have a higher chance of treating a related subject matter.</li>
                    <li>Our algorithm then builds a <strong>Force Directed Graph</strong> to distribute the papers in a way that visually clusters similar papers together and pushes less similar papers away from each other. Upon node selection <strong>we highlight the shortest path from each node to the origin paper</strong> in similarity space.</li>
                    <li>Our database is connected to the Semantic Scholar Paper Corpus (licensed under ODC-BY). Their team has done an amazing job of compiling <strong>hundreds of millions of published papers across many scientific fields.</strong></li>
                </ul>
                <br />
                <h4>Our story</h4>
                <p>Connected Papers started as a weekend side project between friends. We've been working with academic papers for years and felt a great need for better tools for science and research.</p>
                <br />
                <p>When we saw how much this tool improved our own literature search workflows - and got increasingly more requests from friends and colleagues to use it - we committed to release it to the public.</p>
                <br />
                <p>You know... for science.</p>
            </div>
        </div>
    );
}
export default About;