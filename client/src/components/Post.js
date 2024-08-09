import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, createComment } from '../server';
import { formatDate, catchErrors } from '../utils';

import Loader from './Loader';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const PostContainer = styled.div`
  display: block;
  max-width: 800px;
  margin: auto;
`;
const PostTitle = styled.h3`
  font-weight: 700;
  font-size: ${fontSizes.xxl};
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
const PostThumbnail = styled.div`
  ${mixins.coverShadow};
  width: 100%;
  height: auto;
  margin: ${spacing.md} auto;
`;
const PostCaption = styled.p`
  font-size: ${fontSizes.md};
  margin-bottom: ${spacing.md};
  letter-spacing: -0.025em;
`;
const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;
const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  border-radius: 4px;
`;
const InputField = styled.input`
  color: ${colors.black};
  font-size: ${fontSizes.sm};
  padding: ${spacing.sm} ${spacing.xxs};

  width: 100%;
  max-width: 100%;
  min-width: 100%;
`;
const TextField = styled.input`
  color: ${colors.black};
  font-size: ${fontSizes.sm};
  padding: ${spacing.sm} ${spacing.xxs};
  width: 100%;
  max-width: 100%;
  min-width: 100%;
`;
const SubmitButton = styled.button`
  ${mixins.button};
`;
const Comment = styled.div`
  padding: ${spacing.sm} 0;
  border-bottom: 1px solid ${colors.lightestGrey};
`;
const CommentMetadata = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
`;

const Post = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    author: '',
    body: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPost(slug);
      setPost(data);
    };
    catchErrors(fetchData());
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    catchErrors(createComment(post.id, comment.author, comment.body));
  };

  return (
    <React.Fragment>
      {post ? (
        <Main>
          <PostContainer>
            <PostTitle>{post.title}</PostTitle>

            <PostMetadata>Posted {formatDate(post.created)}</PostMetadata>

            <PostMetadata>
              Tags: {post.tags.map((tag, index) => (
                <span key={tag.slug}>
                  <a href={`/tags/${tag.slug}`}>{tag.name}</a>
                  {index < post.tags.length - 1 && ', '}
                </span>
              ))}
            </PostMetadata>

            <PostThumbnail>
              <img src={post.image} alt={post.caption} />
            </PostThumbnail>

            <PostCaption dangerouslySetInnerHTML={{ __html: post.caption }} />

            <CommentSection>
              <h3>Comments:</h3>
              <CommentForm onSubmit={handleSubmit}>
                <InputField 
                  name="author"
                  value={comment.author} 
                  placeholder="Name" 
                  onChange={handleChange}
                />
                <TextField 
                  name="text"
                  value={comment.body} 
                  placeholder="Add a comment..." 
                  onChange={handleChange}
                />
                <SubmitButton type="submit">Comment</SubmitButton>
              </CommentForm>
              {post.comments.map((comment, i) => (
                <Comment key={i}>
                  <CommentMetadata>{comment.author}, {formatDate(comment.created)}</CommentMetadata>
                  <p>{comment.body}</p>
                </Comment>
              ))}
            </CommentSection>
          </PostContainer>
        </Main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default Post;
