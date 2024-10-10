import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import LatestCard from './LatestCard';

const Entertainment = () => {

    const [entertainmentNews, setEntertainmentNews] = useState([]);
    const [popularEntertainmentNews, setPopularEntertainmentNews] = useState([]);
    const [liveEntertainmentNews, setLiveEntertainmentNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API
    useEffect(() => {
        const fetchEntertainmentNews = async () => {
            try {
                const response = await axios.get('https://global-news-server-phi.vercel.app/news');
                const newsData = response.data;
                console.log(newsData);
                // Filter for Entertainment news
                const filteredEntertainmentNews = newsData.filter(news => news.category === 'Entertainment');
                console.log(filteredEntertainmentNews);
                const filteredPopularEntertainmentNews = filteredEntertainmentNews.filter(news => news.popular_news === true);
                const liveEntertainmentNews = filteredEntertainmentNews.find(news => news.isLive);
                setEntertainmentNews(filteredEntertainmentNews);
                setPopularEntertainmentNews(filteredPopularEntertainmentNews);
                setLiveEntertainmentNews(liveEntertainmentNews || null);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch news');
                setLoading(false);
            }
        };

        fetchEntertainmentNews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto min-h-screen py-20">
            <div className='lg:w-1/2 mx-auto my-3 lg:my-4 text-center text-gray-100'>
                <h2 className="font-bold text-2xl lg:text-4xl">
                    Entertainment News Here
                </h2>
                <p className='mt-3'>Catch up on the latest entertainment news, from movies and TV shows to celebrity updates, music trends, and exclusive interviews, bringing you closer to the stars.</p>
            </div>

            {/* Live Entertainment News */}
            <Link to={`/news/${liveEntertainmentNews?._id}`}>
                {
                    liveEntertainmentNews && <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
                        <div className="md:w-1/2 w-[500px] h-[500px]">
                            <img
                                src={liveEntertainmentNews?.image}
                                alt={liveEntertainmentNews?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{liveEntertainmentNews?.title}</h3>
                                <hr className='my-4' />
                                <p className="text-gray-300 mb-4">{liveEntertainmentNews?.description.slice(0, 1000)}...</p>
                            </div>
                            <div>
                                <p className="text-gray-100 text-sm mb-2">{new Date(liveEntertainmentNews?.timestamp).toLocaleString()}</p>
                                {liveEntertainmentNews?.isLive && (
                                    <span className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase rounded-full">
                                        Live
                                    </span>
                                )}
                                <div className="flex justify-between items-center text-xl md:text-2xl my-3 text-slate-100">
                                    <MdFavoriteBorder />
                                    <CiBookmark />
                                    <IoShareSocialOutline />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Link>
            {/* All Entertainment News */}
            <div className='flex flex-col lg:flex-row gap-5 px-4'>
                <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
                    <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
                        Entertainment
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        {entertainmentNews.slice(0, 12).map((news) => (
                            <LatestCard key={news._id} news={news} />
                        ))}
                    </div>
                    <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06] glass">
                        See More
                    </button>
                </div>
                {/* Latest Entertainment News */}
                <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
                    <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
                        Popular News
                    </h2>
                    <div className='flex flex-col gap-5'>
                        {popularEntertainmentNews.slice(0, 6).map((news) => (
                            <LatestCard key={news._id} news={news} />
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

export default Entertainment;