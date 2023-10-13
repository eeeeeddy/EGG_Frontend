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
import History from './History';
import Dashboard from './Dashboard_article';
import SavePaper from './SavePaper';
import Detail_graph from './Detail_graph';
import { UserProvider } from './UserContext';
import Dashboard_article from './Dashboard_article';
import Dashboard_author from './Dashboard_author';

function App() {

    return (
        <UserProvider>
            <BrowserRouter>
                <div className='my-1'>
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
                        <Route path="/History" element={<History />} />
                        <Route path="/SavePaper" element={<SavePaper />} />
                        <Route path="/Detail_graph" element={<Detail_graph />} />
                        <Route path="/Dashboard_article" element={<Dashboard_article />} />
                        <Route path="/Dashboard_author" element={<Dashboard_author />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserProvider>
    )
}
export default App;
