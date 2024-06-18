import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchArticle, fetchComments } from '../api/api';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchArticle(id),
      fetchComments(id)
    ])
    .then(([article, comments]) => {
      setArticle(article);
      setComments(comments);
      setIsLoading(false);
    })
  }, [id]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="article">
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <p>Author: {article.author}</p>
      <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
      <p>Votes: {article.votes}</p>
      
      <h3>Article Comments:</h3>
      <ul className="comments-list">
        {comments.map(comment => (
          <li key={comment.comment_id}>
            <p>{comment.body}</p>
            <p>Author: {comment.author} | Votes: {comment.votes} | Posted at: {new Date(comment.created_at).toLocaleString()}</p>
            <button>Upvote</button>
            <button>Downvote</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Article;

