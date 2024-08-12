import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Nav from './Nav';
import Post from './Post';
import Posts from './Posts';
import Tag from './Tag';
import Tags from './Tags';
import Print from './Print';
import Prints from './Prints';
import Cart from './Cart';

import styled from 'styled-components';
import { GlobalStyle, theme, media } from '../styles';

const SiteWrapper = styled.div`
  padding-left: ${theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

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
      <SiteWrapper>
        <GlobalStyle />
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/blog" replace />} />
          <Route path="/blog" element={ <Posts/> }/>
          <Route path="/blog/:slug" element={ <Post/> }/>
          <Route path="/tags" element={ <Tags/> }/>
          <Route path="/tags/:slug" element={ <Tag/> }/>
          <Route path="/store" element={ <Prints/> }/>
          <Route path="/store/:slug" element={ <Print/> }/>
          <Route path="/cart" element={ <Cart/> }/>
        </Routes>
      </SiteWrapper>
    </Router>
  );
}

export default App;
