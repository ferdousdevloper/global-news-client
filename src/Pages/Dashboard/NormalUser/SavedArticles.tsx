import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import useAuth from '../../../hooks/useAuth';

interface Article {
  _id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  date_time: string;
  authorName: string;
}

const SavedArticles: React.FC = () => {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const auth = useAuth();
  const { user, loading } = auth || {};

  useEffect(() => {
    const fetchUserBookmarks = async () => {
      if (user) {
        try {
          const bookmarksResponse = await axios.get(`https://global-news-server-phi.vercel.app/bookmarks/${user.email}`);
          const bookmarks = bookmarksResponse.data;

          const articlePromises = bookmarks.map((newsId: string) =>
            axios.get(`https://global-news-server-phi.vercel.app/news/${newsId}`)
          );

          const articlesResponses = await Promise.all(articlePromises);
          const articles: Article[] = articlesResponses.map((res) => res.data);

          setSavedArticles(articles);
        } catch (error) {
          console.error('Error fetching saved articles:', error);
        }
      }
    };

    if (!loading && user) {
      fetchUserBookmarks();
    }
  }, [user, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view saved articles.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Saved Articles</h1>
      {savedArticles.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article) => (
            <li
              key={article._id}
              className="border p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition duration-300"
            >
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600 mb-2">{article.category}</p>
              <p className="text-gray-600 mb-4">
                {article.description.slice(0, 80)}...
                <Link
                  to={`/news/${article._id}`}
                  className="text-green-500 hover:text-green-300 ml-2"
                >
                  See More
                </Link>
              </p>
              <p className="text-gray-500">By {article.authorName}</p>
              <p className="text-gray-500">{article.date_time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No saved articles yet.</p>
      )}
    </div>
  );
};

export default SavedArticles;