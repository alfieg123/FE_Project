import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchArticle, fetchComments, voteOnArticle, postComment, deleteComment } from '../api/api';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = 'cooljmessy';

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
  }
  
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if(comment === '' || username === '') {
      console.error("Username and Comment must not be empty!")
    }

    postComment(id, { username : username, body: comment })
    .then((newComment) => {
      setComments((comments) => [newComment, ...comments]);
      setComment('');
      setUsername('');
      setIsSubmitting(false);
    })
    .catch((error) => {
      if (error.response.status === 404) {
      console.error('Please enter a valid username!', error);
      setIsSubmitting(false); 
      }
    });
  }

  const handleCommentDelete = (comment_id) => {
    deleteComment(comment_id)
    .then(() => {
      setComments((comments) => comments.filter((comment) => comment.comment_id !== comment_id));
    });
  };

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
            {comment.author === currentUser && (<button onClick={() => handleCommentDelete(comment.comment_id)}>Delete</button>)}
          </li>
        ))}
      </ul>

      <h3>Add New Comment:</h3>
      <form onSubmit={handleCommentSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
          </label>
          <label>
            Comment:
            <input type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
    </div>
  );
};

export default Article;

