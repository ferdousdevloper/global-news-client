import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://global-news-server-phi.vercel.app'); // Your server URL

const NewsApp = () => {
  const [liveNews, setLiveNews] = useState([]);
  const [allNews, setAllNews] = useState([]);

  // Fetch all news articles from the backend
  const fetchAllNews = async () => {
    try {
      const response = await axios.get('https://global-news-server-phi.vercel.app/news'); // Your server URL
      setAllNews(response.data);
    } catch (error) {
      console.error('Error fetching all news:', error);
    }
  };

  // Fetch and listen for real-time live news updates
  useEffect(() => {
    // Receive live news from the server
    socket.on('liveNews', (newsArticles) => {
      setLiveNews(newsArticles);
    });

    // Handle individual news posted updates (real-time)
    socket.on('newsPosted', (newsArticle) => {
      if (newsArticle.isLive) {
        setLiveNews((prevLiveNews) => [newsArticle, ...prevLiveNews]);
      }
      setAllNews((prevAllNews) => [newsArticle, ...prevAllNews]);
    });

    // Fetch all news initially
    fetchAllNews();

    // Clean up on disconnection
    return () => {
      socket.off('liveNews');
      socket.off('newsPosted');
    };
  }, []);

  return (
    <div>
      <h1>Live News</h1>

      {/* Display live news */}
      <ul>
        {liveNews.length > 0 ? (
          liveNews.map((article, index) => (
            <li key={index}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <small>{new Date(article.timestamp).toLocaleString()}</small>
              {article.isLive && <span> - Live</span>}
            </li>
          ))
        ) : (
          <p>No live news available.</p>
        )}
      </ul>

      <h1>All News</h1>

      {/* Display all news */}
      <ul>
        {allNews.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <small>{new Date(article.timestamp).toLocaleString()}</small>
            {article.isLive && <span> - Live</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsApp;