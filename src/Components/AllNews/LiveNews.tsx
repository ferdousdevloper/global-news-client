import React, { useEffect, useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import ShareDropdown from "../Home/ShareDropdown";
import Bookmark from "../Bookmark";

interface NewsArticle {
  _id: string;
  title: string;
  description: string;
  image: string;
  timestamp: string;
  isLive: boolean;
}

const LiveNews: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsArticle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const { user, loading: authLoading } = auth || {};

  useEffect(() => {
    // Fetch the latest live news from the server
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('https://global-news-server-phi.vercel.app/news?isLive=true');  // Adjust your API endpoint if needed
        if (!response.ok) {
          throw new Error("Failed to fetch live news");
        }
        const news: NewsArticle[] = await response.json();
        if (news.length > 0) {
          setLatestNews(news[0]); // Set the latest news
        } else {
          setError("No live news available");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error("Error fetching live news:", err);
      }
    };

    fetchLatestNews();
  }, []);

  if (authLoading) return <p>Loading...</p>;
  if (error) {
    return <div className="p-6 text-red-600 text-center">{error}</div>;
  }

  if (!latestNews) {
    return (
      <div className="flex items-center justify-center h-full p-6 text-gray-700">
        <div>No live news available.</div>
      </div>
    );
  }

  const formattedDate = new Date(latestNews.timestamp).toLocaleString();
  return (
    <>
      <h1 className="text-4xl mt-16 font-black btn cursor-auto glass text-red-600">LIVE ...</h1>
      <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass">
        <div className="md:w-1/2 w-full">
          <img
            src={latestNews.image}
            alt={latestNews.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{latestNews.title}</h3>
            <hr className="my-4" />
            {/* Description with "See More" */}
            <p className="text-gray-300 mt-1">
              {latestNews.description.length > 1000 ? (
                <>
                  {latestNews.description.slice(0, 1000)}...
                  <Link
                    to={`/news/${latestNews._id}`}
                    className="text-blue-500 hover:text-blue-300"
                  >
                    {" "} See Full News
                  </Link>
                </>
              ) : (
                latestNews.description
              )}
            </p>

          </div>
          <div>-
            <p className="text-gray-100 text-sm mb-2">{formattedDate}</p>
            <div className="flex justify-between items-center text-xl md:text-2xl mt-auto pt-4 text-slate-100">
              <MdFavoriteBorder />
              {/* Use Bookmark component */}
              <Bookmark newsId={latestNews._id} />
              <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${latestNews._id}`} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveNews;
