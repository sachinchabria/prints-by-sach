import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Post from './Post';
import Posts from './Posts';
import Tag from './Tag';
import Tags from './Tags';

import { GlobalStyle } from '../styles';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/blog" replace />} />
        <Route path="/blog" element={ <Posts/> }/>
        <Route path="/blog/:slug" element={ <Post/> }/>
        <Route path="/tags" element={ <Tags/> }/>
        <Route path="/tags/:slug" element={ <Tag/> }/>
      </Routes>
    </Router>
  );
}

export default App;
