import React, { useEffect, useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import ShareDropdown from "./ShareDropdown";
import useAuth from "../../hooks/useAuth";
import Bookmark from "../Bookmark";

interface NewsItem {
  category: string;
  _id: string;
  title: string;
  image: string;
  description: string;
  date_time: string;
}

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const { loading: authLoading } = auth || {};

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://global-news-server-phi.vercel.app/news");
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news data");
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading || authLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const latestNews = news.slice(0, 7);
  const allNews = news.slice(7, 17);

  return (
    <div className="container mx-auto my-10" style={{ width: "85%" }}>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-3xl font-bold mb-4 text-slate-50">All News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allNews.map((item) => (
              <div key={item._id} className="border p-4 rounded-lg shadow-lg glass flex flex-col h-full min-h-[400px]">
                <Link to={`/news/${item._id}`}>
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover mb-4 rounded-md" />
                </Link>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-base badge font-semibold mb-1 ">{item.category}</h3>
                  <Link to={`/news/${item._id}`}>
                    <h2 className="text-xl font-bold mb-2 text-slate-50 hover:underline">{item.title}</h2>
                  </Link>
                  <p className="text-sm mb-2 text-slate-100">{new Date(item.date_time).toLocaleDateString()}</p>
                  <p className="text-slate-100 flex-grow">
                    {item.description.length > 80 ? (
                      <>
                        {item.description.slice(0, 80)}...
                        <Link to={`/news/${item._id}`} className="text-green-500 hover:text-green-300"> See More</Link>
                      </>
                    ) : (
                      item.description
                    )}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xl md:text-2xl mt-auto pt-4 text-slate-100">
                  <MdFavoriteBorder />
                  {/* Use the Bookmark component here */}
                  <Bookmark newsId={item._id} />
                  <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${item._id}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News Section */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">Latest News</h2>
          <div className="space-y-6">
            {latestNews.map((item) => (
              <div key={item._id} className="border p-4 rounded-lg shadow-lg glass flex flex-col h-full min-h-[300px]">
                <Link to={`/news/${item._id}`}>
                  <img src={item.image} alt={item.title} className="w-full h-24 object-cover mb-2 rounded-md" />
                </Link>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-base badge font-semibold mb-1 ">{item.category}</h3>
                  <Link to={`/news/${item._id}`}>
                    <h3 className="text-lg font-semibold mb-1 text-slate-50 hover:underline">{item.title}</h3>
                  </Link>
                  <p className="text-sm text-slate-100">{new Date(item.date_time).toLocaleDateString()}</p>
                </div>

                <div className="flex justify-between items-center text-xl md:text-2xl mt-auto pt-4 text-slate-100">
                  <MdFavoriteBorder />
                  {/* Use the Bookmark component here as well */}
                  <Bookmark newsId={item._id} />
                  <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${item._id}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
