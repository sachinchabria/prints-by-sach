import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTag } from '../server';
import { catchErrors, formatDate } from '../utils';

import Loader from './Loader';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  max-width: 400px;
  margin: auto;
  text-align: center;
`;
const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin: ${spacing.base} auto;
  max-width: 800px;
`;
const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: auto;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const PostImage = styled(Link)`
  display: inline-block;
  position: relative;
  height: auto;
  margin: ${spacing.sm} 0 ${spacing.base} 0;
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    height: auto;
  }
`;
const PostTitle = styled.a`
  font-weight: 700;
  font-size: ${fontSizes.xxl};
  letter-spacing: -0.05em;
  margin: ${spacing.xs} 0;
  border-bottom: 2px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 2px solid ${colors.black};
  }
`;
const PostMetadata = styled.p`
  color: ${colors.lightGrey};
  a {
    color: ${colors.blue};
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      color: ${colors.red};
      border-bottom: 1px solid ${colors.red};
    }
  }
`;
const PostCaption = styled.p`
  color: ${colors.black};
  font-size: ${fontSizes.lg};
  letter-spacing: -0.025em;
  ${media.thone`
    font-size: ${fontSizes.md};
  `};
`;

const Tag = () => {
  const { slug } = useParams();

  const [tag, setTag] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTag(slug);
      setTag(data);
    };
    catchErrors(fetchData());
  }, [slug]);

  return (
    <React.Fragment>
      {tag ? (
        <Main>
          <Header>
            <h1>{tag.name}</h1>
            <p>{tag.description}</p>
          </Header>

          <PostsContainer>
            {tag.posts.map(({ title, slug, image, caption, created, tags }, i) => (
              <Post key={slug}>
                <PostTitle href={`/blog/${slug}`}>
                  {title}
                </PostTitle>
                <PostMetadata>Posted {formatDate(created)}</PostMetadata>
                <PostMetadata>
                  Tags: {tags.map((tag, index) => (
                    <span key={tag.slug}>
                      <a href={`/tags/${tag.slug}`}>{tag.name}</a>
                      {index < tags.length - 1 && ', '}
                    </span>
                  ))}
                </PostMetadata>
                <PostImage to={`/blog/${slug}`}>
                  <img src={image} alt="Print" />
                  <Mask />
                </PostImage>
                <PostCaption dangerouslySetInnerHTML={{ __html: caption }} />
              </Post>
            ))}
          </PostsContainer>
          
        </Main>
        
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default Tag;
