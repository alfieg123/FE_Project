import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchArticle, fetchComments, voteOnArticle } from '../api/api';

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

  const handleVote = (voteAdjustment) => {
    setArticle((article) => ({
      ...article,
      votes: article.votes + voteAdjustment,
    }));

    voteOnArticle(id, voteAdjustment)
      .then((updatedArticle) => {
        setArticle(updatedArticle);
      })
    }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="article">
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <img src={article.article_img_url} />
      <p>Author: {article.author}</p>
      <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
      <p>Votes: {article.votes}</p>
      <button onClick={() => handleVote(1)}>Upvote</button>
      <button onClick={() => handleVote(-1)}>Downvote</button>
      
      <h3>Article Comments:</h3>
      <ul className="comments-list">
        {comments.map(comment => (
          <li key={comment.comment_id}>
            <p>{comment.body}</p>
            <p>Author: {comment.author} | Votes: {comment.votes} | Posted at: {new Date(comment.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Article;

