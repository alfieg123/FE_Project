import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchTopics } from '../api/api';

const TopicList = () => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetchTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
        setIsLoading(false);
      })
    }, [])
  
    if (isLoading) return <p>Loading...</p>;
    
    return (
    <div className="topic-list">
    <h2>Article Topics</h2>
    <ul>
      {topics.map((topic) => (
        <li key={topic.slug}>
        <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
        </li>
      ))}
    </ul>
    </div>
    );
}

export default TopicList;