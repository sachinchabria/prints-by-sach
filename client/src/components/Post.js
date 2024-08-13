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
  ${media.tablet`
    font-size: ${fontSizes.xl};
    margin: 0 0 8px;
  `};
`;
const PostMetadata = styled.p`
  color: ${colors.lightGrey};
  margin: 0 0 4px;
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
 
  height: auto;
  margin: ${spacing.md} auto;
  ${media.tablet`
    margin: ${spacing.base} auto;
  `};
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
`;
const InputField = styled.input`
  max-width: 400px;
  margin-bottom: ${spacing.sm};
`;
const TextField = styled.textarea`
  width: 100%;
  margin-bottom: ${spacing.base};
`;
const SubmitButton = styled.button`
  ${mixins.button};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
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
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, { 
        author: comment.author, 
        body: comment.body, 
        created: new Date().toISOString()
      }]
    }));
    setComment({
      author: '',
      body: ''
    });
  };

  const isSubmitDisabled = !comment.author.trim() || !comment.body.trim();

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
              <h3>Comments</h3>
              <CommentForm onSubmit={handleSubmit}>
                <label>Your name</label>
                <InputField 
                  name="author"
                  value={comment.author} 
                  placeholder="or alias to remain anonymous..." 
                  onChange={handleChange}
                />
                <label>Comment</label>
                <TextField 
                  name="body"
                  rows="2"
                  value={comment.body}
                  placeholder="your photos suck stick to tennis..." 
                  onChange={handleChange}
                />
                <SubmitButton type="submit" disabled={isSubmitDisabled}>
                  Comment
                </SubmitButton>
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
