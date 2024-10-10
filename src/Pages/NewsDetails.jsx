import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { GiMicrophone } from "react-icons/gi";
import { MdFavoriteBorder } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import ShareDropdown from '../Components/Home/ShareDropdown';
import Bookmark from '../Components/Bookmark';

const NewsDetail = () => {
  const { id } = useParams(); // Get the id from the URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    // Fetch the news details based on the id
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`https://global-news-server-phi.vercel.app/news/${id}`);
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load news details");
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="max-w-6xl w-full my-40 p-8 bg-neutral-950 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out glass">
        {news ? (
          <>
            <div className='flex flex-col lg:flex-row items-center text-left gap-2'>
              <GiMicrophone className='text-3xl text-[#02AA08]' />
              <h1 className="text-4xl font-bold mb-4 text-center text-white">{news.title}</h1>
            </div>
            <hr className='py-4' />
            <img
              src={news.image}
              alt={news.title}
              className="w-full object-cover mb-6 rounded-lg"
            />

            <div className="flex justify-between text-gray-200 text-sm mb-6">
              <span>Category: {news.category}</span>
              <div className='flex gap-2 items-center'>
                <FaLocationDot className='text-red-700' />
                <span>Region: {news.region}</span>
              </div>
            </div>
            <p className="text-gray-200 text-sm mb-6">
              Published on: {new Date(news.date_time).toLocaleDateString()}
            </p>
            <div className="flex justify-between">
              <span
                className={`text-sm font-semibold ${news.breaking_news ? "text-red-500" : "text-gray-700"} badge`}
              >
                {news.breaking_news ? "Breaking News" : "Regular News"}
              </span>
              <span
                className={`text-sm font-semibold ${news.popular_news ? "text-colorPrimary" : "text-gray-400"} badge`}
              >
                {news.popular_news ? "Popular News" : "Less Popular"}
              </span>
            </div>
            <hr className="my-2" />
            <div className='text-gray-300'>
              <h3 className='font-bold underline mb-4'>News:</h3>
              <p className="text-lg leading-relaxed mb-6 text-justify">{news.description}</p>
              <div className="flex justify-between items-center text-xl md:text-2xl my-3">
                <MdFavoriteBorder />
                <Bookmark newsId={news._id} />
                <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${news._id}`} />
              </div>
            </div>
          </>
        ) : (
          <p>No news found</p>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
