import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesByTopic } from '../api/api';
import ArticleCard from './ArticleCard';

const Topic = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticlesByTopic(slug)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
  }, [slug]);

  if (isLoading) return <p>Loading articles...</p>;

  return (
    <div className="article-list">
      {articles.map((article) => (
        <ArticleCard article={article} key={article.article_id} />
      ))}
    </div>
  );
};

export default Topic;