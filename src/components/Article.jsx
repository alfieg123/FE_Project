import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://backendproject-o0uj.onrender.com/api/articles/${id}`)
      .then((response) => {
        setArticle(response.data.article);
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
    </div>
  );
};

export default Article;

