import axios from "axios";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../loadingAnimation.json"
import Favorite from "../Components/Favorite";
import Bookmark from "../Components/Bookmark";
import ShareDropdown from "../Components/Home/ShareDropdown";
import LatestCard from "./LatestCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Opinion = () => {
  const [allNews, setAllNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [liveOpinionNews, setLiveOpinionNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 news items per page

  

  useEffect(() => {
    const fetchOpinionNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/news");
        const newsData = response.data;
        const opinionNews = newsData.filter(
          (singleNews) => singleNews.category === "Opinion"
        );
        const popularOpinionNews = allNews.filter(
          (singleNews) =>
            singleNews.category === "Opinion" &&
            singleNews.popular_news === true
        );
        const liveNews = allNews.filter(
          (singleNews) =>
            singleNews.category === "Opinion" && singleNews.isLive === true
        );
        setLiveOpinionNews(liveNews[0]);
        setAllNews(opinionNews);
        setPopularNews(popularOpinionNews);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news");
        setLoading(false);
      }
    };

    fetchOpinionNews();
  }, [allNews]);

  if (loading) {
    return (
      <div className="w-2/4 mx-auto">
        <Lottie
          animationData={loadingAnimation}
          height={100}
          width={100}
        ></Lottie>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Pagination logic
  const totalItems = allNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = allNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto min-h-screen pt-20">
      <div className="lg:w-1/2 mx-auto my-3 lg:my-4 text-center text-gray-100">
        <h2 
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="100"
        className="font-bold text-2xl lg:text-4xl">Opinion</h2>
        <p 
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="200"
        className="mt-3">
          Our Opinion page offers a platform for thought leaders, experts, and
          everyday voices to share their perspectives on politics, culture, and
          social change. Engage with debates that challenge conventional
          thinking and spark meaningful conversations about the future.
        </p>
      </div>

      {/* Live Politics News */}
      {liveOpinionNews && (
        <div 
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="300"
        className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
          <div className="md:w-1/2 w-full">
            <img
              src={liveOpinionNews?.image}
              alt={liveOpinionNews?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {liveOpinionNews?.title}
              </h3>
              <hr className="my-4" />
              <p className="text-gray-300 mb-4">
                {liveOpinionNews?.description.slice(0, 1000)}...
              </p>
            </div>
            <div>
              <p className="text-gray-100 text-sm mb-2">
                {new Date(liveOpinionNews?.timestamp).toLocaleString()}
              </p>
              {liveOpinionNews?.isLive && (
                <span className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase rounded-full">
                  Live
                </span>
              )}
               <div className="flex justify-between items-center text-xl md:text-2xl my-3 text-slate-100 relative z-10">
                <Favorite newsId={liveOpinionNews._id} />
                <Bookmark newsId={liveOpinionNews._id} />

                <div className="relative">
                  <ShareDropdown
                    url={`http://localhost:3001/news/${liveOpinionNews._id}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Politics News bar section */}
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {" "}
            {currentNews.map((item) => (
              <LatestCard key={item._id} news={item} />
            ))}
          </div>
        </div>
        {/* popular politics news section */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl text-white">
          <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-600">
            <button
              type="button"
              className="pb-5 text-xl font-bold uppercase border-b-2 dark:border- dark:text-gray-600"
            >
              Popular
            </button>
          </div>
          {/* popular news card */}
          {popularNews.slice(0, 3).map((popularSingleNews) => (
             <LatestCard key={popularSingleNews._id} news={popularSingleNews} />
          ))}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="mt-6 flex justify-center items-center text-white">
        <button
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="px-4 py-2 mx-1 bg-colorPrimary glass rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>

        {currentPage > 1 && (
          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="250"
            className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}

        <span
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          className="px-4 py-2 mx-1 rounded-lg bg-colorPrimary glass text-white"
        >
          {currentPage}
        </span>

        {currentPage < totalPages && (
          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="350"
            className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}

        <button
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
          className="px-4 py-2 mx-1 bg-colorPrimary glass rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Opinion;
