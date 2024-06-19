import React from 'react';
import { Link } from "react-router-dom";
import './ArticleCard.css'

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>By {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>{new Date(article.created_at).toLocaleDateString()}</p>
      <p></p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
      <Link to= {`/articles/${article.article_id}`}>Read Full Article</Link>
    </div>
  );
};

export default ArticleCard;