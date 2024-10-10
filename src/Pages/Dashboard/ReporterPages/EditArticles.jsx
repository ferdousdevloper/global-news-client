// src/Pages/Dashboard/ReporterPages/EditArticles.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticles = () => {
  const { articleId } = useParams(); // Get the article ID from the URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const [article, setArticle] = useState({
    title: '',
    content: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) {
        setError('Article ID is missing'); // Handle missing ID case
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://global-news-server-phi.vercel.app/news/get-article/${articleId}`);
        setArticle(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching article data');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://global-news-server-phi.vercel.app/news/edit-article/${articleId}`, article);
      navigate('/dashboard/submitted-articles'); // Redirect to submitted articles page after successful edit
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating article'); // Improved error handling
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <form onSubmit={handleSubmit} className="bg-neutral-900 glass shadow-md text-white rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={article.title}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded bg-transparent"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={article.image}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded bg-transparent"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={article.category}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded bg-transparent"
          />
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={article.region}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded bg-transparent"
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={article.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 h-96 bg-transparent"
        />
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="breaking_news"
              checked={article.breaking_news}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>Breaking News</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="popular_news"
              checked={article.popular_news}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>Popular News</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isLive"
              checked={article.isLive}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>Live News</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-colorPrimary font-bold py-2 px-4 rounded hover:bg-green-700"
        >
          Post News
        </button>
      </form>
    </div>
  );
};

export default EditArticles;
