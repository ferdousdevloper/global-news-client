import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateNews = () => {
  const { id } = useParams(); // Get the news ID from the URL parameters
  const navigate = useNavigate(); // For navigation after update
  const [newsData, setNewsData] = useState({
    image: '',
    title: '',
    category: '',
    region: '',
    description: '',
    date_time: '',
    breaking_news: false,
    popular_news: false,
  });

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(`https://global-news-server-phi.vercel.app/news/${id}`);
        setNewsData(response.data); // Set the fetched data as default values
      } catch (error) {
        console.error('Error fetching news data:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch news data.',
          icon: 'error',
        });
      }
    };

    fetchNewsData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewsData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating news with data:", newsData); // Log the data being sent
    try {
      const response = await axios.put(`https://global-news-server-phi.vercel.app/news/${id}`, newsData);
      if (response.status === 200) {
        Swal.fire({
          title: 'Updated!',
          text: 'News item updated successfully.',
          icon: 'success',
        });
        navigate('/manage-news'); // Redirect to manage news page
      }
    } catch (error) {
      console.error('Error updating news:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update news item: ' + error.response.data,
        icon: 'error',
      });
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Update News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={newsData.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={newsData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={newsData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Region</label>
          <input
            type="text"
            name="region"
            value={newsData.region}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Date and Time</label>
          <input
            type="text"
            name="date_time"
            value={newsData.date_time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={newsData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 bg-transparent h-96"
            required
          />
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="breaking_news"
              checked={newsData.breaking_news}
              onChange={handleChange}
              className="mr-2"
            />
            Breaking News
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="popular_news"
              checked={newsData.popular_news}
              onChange={handleChange}
              className="mr-2"
            />
            Popular News
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update News
        </button>
      </form>
    </div>
  );
};

export default UpdateNews;
