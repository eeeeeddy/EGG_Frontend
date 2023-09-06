import logo from './umm/logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Search from './Search';
import React from 'react';
import Detail from './Detail';

function App() {
    return (
        <BrowserRouter>
            <div className='container my-1'>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/Search" element={<Main />} />
                    <Route path="/Search" element={<Detail />} />
                    <Route path="/Detail" element={<Detail />} />
                    <Route path="/Detail" element={<Main />} />
                    <Route path="/Detail" element={<Search />} />
                </Routes>
            </div>
        </BrowserRouter>

        // <div> < Detail /> </div>
    )

}
export default App;
