import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import './ArticleList.css'

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://backendproject-o0uj.onrender.com/api/articles')
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
      })
  }, []);

  if (isLoading) return <p>Loading...</p>;
  
  return (
    <div className="article-list">
      {articles.map((article) => (
        <ArticleCard article={article} key={article.article_id} />
      ))}
    </div>
  );
};

export default ArticleList;