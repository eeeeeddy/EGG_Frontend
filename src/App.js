import logo from './umm/logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Search from './Search';
import React from 'react';

function App() { 
  return(
    <BrowserRouter>
      <div className='container my-1'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/Search" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

}
export default App;
