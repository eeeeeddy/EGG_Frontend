import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Search from './Search';
import React from 'react';
import Detail from './Detail';
// import Test from './Test';

function App() {

    return (
        <BrowserRouter>
            <div className='my-1'>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/Detail" element={<Detail />} />
                    <Route path="/search/:searchQuery" element={<Search />} /> 
                    <Route path="/Detail/:article_id" element={<Detail />} />
                    {/* <Route path="/Test" element={<Test />} /> */}
                    {/* <Route path="/Test/:article_id" element={<Test />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
    )

}
export default App;
