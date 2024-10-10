import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md';
import Swal from 'sweetalert2';
import SportCard from './SportCard';
import useAuth from '../hooks/useAuth';
import Bookmark from '../Components/Bookmark';
import ShareDropdown from '../Components/Home/ShareDropdown';

const Sport = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [popularSportsNews, setPopularSportsNews] = useState([]);
  const [liveSportsNews, setLiveSportsNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user authentication
  const auth = useAuth();

  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const response = await axios.get('https://global-news-server-phi.vercel.app/news');
        const newsData = response.data;

        // Filter for sports news
        const filteredSportsNews = newsData.filter(news => news.category === 'Sports');
        const filteredPopularSportsNews = filteredSportsNews.filter(news => news.popular_news === true);
        const filteredLiveSportsNews = filteredSportsNews.find(news => news.isLive);

        setSportsNews(filteredSportsNews);
        setPopularSportsNews(filteredPopularSportsNews);
        setLiveSportsNews(filteredLiveSportsNews || null);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto min-h-screen py-20">
      <div className='lg:w-1/2 mx-auto my-3 lg:my-4 text-center text-gray-100 px-3'>
        <h2 className="font-bold text-2xl lg:text-4xl">Sports</h2>
        <p className='mt-3'>Sports bring people together...</p>
      </div>

            {/* Live Sports News */}
            {liveSportsNews && (
        <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
          <div className="md:w-1/2 w-full">
            <img
              src={liveSportsNews.image}
              alt={liveSportsNews.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{liveSportsNews.title}</h3>
              <hr className='my-4' />
              <p className="text-gray-300 mb-4">{liveSportsNews.description.slice(0, 1000)}...</p>
            </div>
            <div>
              <p className="text-gray-100 text-sm mb-2">{new Date(liveSportsNews.timestamp).toLocaleString()}</p>
              {liveSportsNews.isLive && (
                <span className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase rounded-full">
                  Live
                </span>
              )}
              <div className="flex justify-between items-center text-xl md:text-2xl my-3 text-slate-100">
                <MdFavoriteBorder />
                <Bookmark newsId={liveSportsNews._id} />
                <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${liveSportsNews._id}`} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Sports News */}
      <div className='flex flex-col lg:flex-row gap-5 px-4'>
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">Sports News</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {sportsNews.map((news) => (
              <SportCard key={news._id} news={news} />
            ))}
          </div>

          <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06] glass">
            See More
          </button>
        </div>

        {/* Latest Sports News */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">Popular News</h2>
          <div className='flex flex-col gap-5'>
            {popularSportsNews.map((news) => (
              <SportCard key={news._id} news={news} />
            ))}
          </div>
          <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06] glass">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sport;
