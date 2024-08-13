import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTags } from '../server';
import { catchErrors } from '../utils';

import Loader from './Loader';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const TagsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${spacing.lg};
  margin-top: ${spacing.lg};
  ${media.desktop`
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${spacing.md};
    margin-top: ${spacing.md};
  `};
  ${media.thone`
    grid-template-columns: 1fr;
    grid-gap: ${spacing.md};
    margin-top: ${spacing.md};
  `};
`;
const Tag = styled.div`
  display: flex;
  flex-direction: column;
`;
const TagMask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 30px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const TagImage = styled.img`
  height: 300px;
  object-fit: cover;
`;
const TagCover = styled(Link)`
  ${mixins.coverShadow};
  position: relative;
  width: 100%;
  margin-bottom: ${spacing.base};
  &:hover,
  &:focus {
    ${TagMask} {
      opacity: 1;
    }
  }
`;
const TagName = styled(Link)`
  display: inline;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.black};
  }
`;
const TotalPosts = styled.div`
  text-transform: uppercase;
  margin: 5px 0;
  color: ${colors.grey};
  font-size: ${fontSizes.xs};
  letter-spacing: 1px;
`;

const Tags = () => {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTags();
      setTags(data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <Main>
      <h1>Explore Tags</h1>
        <TagsContainer>
          {tags ? (
            tags.map(({ name, slug, image, posts }, i) => (
              <Tag key={slug}>
                <TagCover to={`/tags/${slug}`}>
                  <TagImage src={image} alt="Tag Art" />
                  <TagMask />
                </TagCover>
                <div>
                  <TagName to={`store/${slug}`}>{name}</TagName>
                  <TotalPosts>{posts.length} Posts</TotalPosts>
                </div>
              </Tag>
            ))
          ) : (
            <Loader />
          )}
        </TagsContainer>
    </Main>
  );
};

export default Tags;
