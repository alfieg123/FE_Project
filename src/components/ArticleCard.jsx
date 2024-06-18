import React from 'react';
import './ArticleCard.css'

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>By {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>{new Date(article.created_at).toLocaleDateString()}</p>
      <p></p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
      <button>Select Article</button>
    </div>
  );
};

export default ArticleCard;