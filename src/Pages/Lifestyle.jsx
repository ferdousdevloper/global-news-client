import axios from "axios";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Lifestyle = () => {
  const [allNews, setAllNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [newsPerPage, setNewsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [liveLifestyleNews, setLiveLifestyleNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const numberofPages = Math.ceil(allNews.length / 2);
  const pages = [...Array(numberofPages).keys()];

  const handleNewsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setNewsPerPage(value);
    setCurrentPage(0);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchLifestyleNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/news");
        const newsData = response.data;
        const lifestyleNews = newsData.filter(
          (singleNews) => singleNews.category === "Lifestyle"
        );
        const popularLifestyleNews = allNews.filter(
          (singleNews) =>
            singleNews.category === "Lifestyle" &&
            singleNews.popular_news === true
        );
        const liveNews = allNews.filter(
          (singleNews) =>
            singleNews.category === "Lifestyle" && singleNews.isLive === true
        );
        setLiveLifestyleNews(liveNews[0]);
        setAllNews(lifestyleNews);
        setPopularNews(popularLifestyleNews);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news");
        setLoading(false);
      }
    };

    fetchLifestyleNews();
  }, [currentPage, newsPerPage, allNews]);

  if (loading) {
    return (
      <div>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-800 container mx-auto min-h-screen pt-20">
      <div className="lg:w-1/2 mx-auto my-3 lg:my-4 text-center text-gray-100">
        <h2 className="font-bold text-2xl lg:text-4xl">Lifestyle</h2>
        <p className="mt-3">
          Explore thoughtful insights into wellness, fashion, and lifestyle
          choices that empower you to live well and with purpose. Discovering
          Life’s Rich Tapestry: Wellness, Culture, and Inspiration" – Immerse
          yourself in the latest trends, ideas, and personal stories that
          inspire a more balanced, mindful, and fulfilling way of living.
        </p>
      </div>

      {/* Live Politics News */}
      {liveLifestyleNews && (
        <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
          <div className="md:w-1/2 w-full">
            <img
              src={liveLifestyleNews?.image}
              alt={liveLifestyleNews?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {liveLifestyleNews?.title}
              </h3>
              <hr className="my-4" />
              <p className="text-gray-300 mb-4">
                {liveLifestyleNews?.description.slice(0, 1000)}...
              </p>
            </div>
            <div>
              <p className="text-gray-100 text-sm mb-2">
                {new Date(liveLifestyleNews?.timestamp).toLocaleString()}
              </p>
              {liveLifestyleNews?.isLive && (
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
      )}

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Politics News bar section */}
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {" "}
            {allNews.map((item) => (
              <Link to={`/news/${item._id}`} key={item._id}>
                <div className="border p-4 rounded-lg shadow-lg glass h-[520px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-60 object-cover mb-4 rounded-md"
                  />
                  <h3 className="text-base badge font-semibold mb-1 ">
                    {item.category}
                  </h3>
                  <h2 className="text-xl font-bold mb-2 text-slate-50">
                    {item.title}
                  </h2>
                  <p className="text-sm mb-2 text-slate-100">
                    {new Date(item.date_time).toLocaleDateString()}
                  </p>
                  <p className="text-slate-100">
                    {item.description.slice(0, 100)}...
                  </p>
                  <div>
                    <p className="text-gray-100 text-sm mb-2">
                      {new Date(liveLifestyleNews?.timestamp).toLocaleString()}
                    </p>
                    <div className="flex justify-around items-center text-xl md:text-2xl my-5 text-slate-100">
                      <MdFavoriteBorder />
                      <CiBookmark />
                      <IoShareSocialOutline />
                    </div>
                  </div>
                </div>
              </Link>
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
          {popularNews.map((popularSingleNews) => (
            <Link
              to={`/news/${popularSingleNews._id}`}
              key={popularSingleNews._id}
              className="flex flex-col divide-y my-2 glass dark:divide-gray-300 h-40"
            >
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-full mr-4 dark:bg-gray-500"
                  src={popularSingleNews.image}
                />
                <div className="flex flex-col flex-grow space-y-2">
                  <p>{popularSingleNews.title}</p>

                  <p className="text-base badge font-semibold mb-1">
                    {popularSingleNews.category}
                  </p>
                  <hr className="my-2" />
                  <div className="flex justify-around items-center text-lg md:text-xl my-1 text-slate-100">
                    <MdFavoriteBorder />
                    <CiBookmark />
                    <IoShareSocialOutline />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* pagination section */}
      <div className=" flex justify-center items-center py-4">
        <p>
          <button
            className="btn mr-1 bg-gray-800 text-white"
            onClick={handlePrevious}
          >
            Previous
          </button>
        </p>
        {pages.map((page) => (
          <button
            className={
              (currentPage === page && "btn bg-red-900 text-white") ||
              "btn mr-1 bg-gray-800 text-white"
            }
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page + 1}
          </button>
        ))}

        <p>
          <button
            className="btn ml-1 bg-gray-800 text-white"
            onClick={handleNext}
          >
            Next
          </button>
        </p>
        <label htmlFor="" className="ml-2 flex justify-center items-center">
          <div>
            <span className="text-white px-2"> News Per Page:</span>
          </div>

          <div>
            {" "}
            <select
              name=""
              value={newsPerPage}
              onChange={handleNewsPerPage}
              className="btn bg-gray-800 text-white"
            >
              <option value="8">4</option>
              <option value="20">10</option>
              <option value="40">20</option>
            </select>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Lifestyle;
