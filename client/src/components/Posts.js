import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPostsShort, getPostsMedium, getPostsLong } from '../server';
import { catchErrors, formatDate } from '../utils';

import Loader from './Loader';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  ${media.tablet`
    display: block;
  `};
`;
const Ranges = styled.div`
  display: flex;
  justify-content: flex-start;
  ${media.tablet`
    justify-content: space-around;
  `};
`;
const RangeButton = styled.button`
  background-color: transparent;
  color: ${props => (props.isActive ? colors.black : colors.lightestGrey)};
  font-weight: 500;
  padding: ${spacing.sm};
  ${media.phablet`
    font-size: ${fontSizes.sm};
  `};
  span {
    padding-bottom: 2px;
    border-bottom: 2px solid ${props => (props.isActive ? colors.black : `transparent`)};
    line-height: 1.5;
    white-space: nowrap;
  }
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

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [activeRange, setActiveRange] = useState('long');

  const apiCalls = {
    long: getPostsLong(),
    medium: getPostsMedium(),
    short: getPostsShort(),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPostsLong();
      setPosts(data);
    };
    catchErrors(fetchData());
  }, []);

  const changeRange = async range => {
    const { data } = await apiCalls[range];
    setPosts(data);
    setActiveRange(range);
  };

  const setRangeData = range => catchErrors(changeRange(range));

  return (
    <Main>
      <Header>
        <h1>Recent Posts</h1>
        <Ranges>
          <RangeButton isActive={activeRange === 'long'} onClick={() => setRangeData('long')}>
            <span>All Time</span>
          </RangeButton>
          <RangeButton isActive={activeRange === 'medium'} onClick={() => setRangeData('medium')}>
            <span>Last 6 Months</span>
          </RangeButton>
          <RangeButton isActive={activeRange === 'short'} onClick={() => setRangeData('short')}>
            <span>Last 4 Weeks</span>
          </RangeButton>
        </Ranges>
      </Header>
      <PostsContainer>
        {posts ? (
          posts.map(({ title, slug, image, caption, created, tags }, i) => (
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
                <img src={image} alt="Post Art" />
                <Mask />
              </PostImage>
              <PostCaption dangerouslySetInnerHTML={{ __html: caption }} />
            </Post>
          ))
        ) : (
          <Loader />
        )}
      </PostsContainer>
    </Main>
  );
};

export default Posts;
