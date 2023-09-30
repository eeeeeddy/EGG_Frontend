import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';
import Main from './Main';
import Search from './Search';
import React from 'react';
import Detail from './Detail';
import About from './About';
import Pricing from './Pricing';
import Login from './Login';
import Author from './Author';
// import UserContext from './UserContext';
// import Test from './Test';

function App() {

    return (
        <BrowserRouter>
            <div className='my-1'> {/* className에서 container 제외 */}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/Detail" element={<Detail />} />
                    <Route path="/search/:searchQuery" element={<Search />} /> 
                    <Route path="/Detail/:article_id" element={<Detail />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Pricing" element={<Pricing />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Author" element={<Author />} />
                    <Route path="/Author/:authorId" element={<Author />} />
                    {/* <Route path="/Test" element={<Test />} /> */}
                    {/* <Route path="/Test/:article_id" element={<Test />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
    )

}
export default App;
