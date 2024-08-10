import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPrints } from '../server';
import { catchErrors } from '../utils';

import Loader from './Loader';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const Wrapper = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
`;
const PrintsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${spacing.lg};
  width: 100%;
  margin-top: ${spacing.lg};
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  `};
`;
const Print = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const PrintMask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: ${theme.transition};
`;
const PrintImage = styled.img`
  object-fit: cover;
  border: 8px solid black;
`;
const PrintCover = styled(Link)`
  ${mixins.coverShadow};
  position: relative;
  width: 100%;
  margin-bottom: ${spacing.base};
  &:hover,
  &:focus {
    ${PrintMask} {
      opacity: 1;
    }
  }
`;
const PrintName = styled(Link)`
  display: inline;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.black};
  }
`;
const StartingPrice = styled.div`
  text-transform: uppercase;
  margin: 5px 0;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  letter-spacing: 1px;
`;

const Prints = () => {
  const [prints, setPrints] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPrints();
      setPrints(data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <Main>
      <h1>Shop Prints</h1>
      <Wrapper>
        <PrintsContainer>
          {prints ? (
            prints.map(({ name, slug, image }, i) => (
              <Print key={i}>
                <PrintCover to={`/store/${slug}`}>
                  <PrintImage src={image} alt="Photography Print" />
                  <PrintMask />
                </PrintCover>
                <div>
                  <PrintName to={`/store/${slug}`}>{name}</PrintName>
                  <StartingPrice>From $10.00</StartingPrice>
                </div>
              </Print>
            ))
          ) : (
            <Loader />
          )}
        </PrintsContainer>
      </Wrapper>
    </Main>
  );
};

export default Prints;
