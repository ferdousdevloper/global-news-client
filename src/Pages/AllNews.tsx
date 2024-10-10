import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LiveNews from "../Components/AllNews/LiveNews";
import useAuth from "../hooks/useAuth";
import ShareDropdown from "../Components/Home/ShareDropdown";
import Bookmark from "../Components/Bookmark";

interface NewsItem {
  _id: string;
  title: string;
  image: string;
  category: string;
  region: string;
  description: string;
  date_time: string;
  breaking_news: boolean;
  popular_news: boolean;
  isLive: boolean;
  timestamp: string;
}

const AllNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All News");
  const [selectedCountry, setSelectedCountry] =
    useState<string>("All Countries");
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<string>("All Dates");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const auth = useAuth();
  const { loading: authLoading } = auth || {};

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>(
          "https://global-news-server-phi.vercel.app/news"
        );
        setNews(response.data);
        setFilteredNews(response.data);

        const uniqueCategories = Array.from(
          new Set<string>(response.data.map((item) => item.category))
        );
        setCategories(uniqueCategories);

        const uniqueCountries = Array.from(
          new Set<string>(response.data.map((item) => item.region))
        );
        setCountries(uniqueCountries);

        setLoading(false);
      } catch (error) {
        setError("Error fetching news");
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [searchTerm, selectedFilter, selectedCountry, selectedDateFilter, news]);

  const filterNews = () => {
    let updatedFilteredNews = news;

    // Filter by search query
    if (searchTerm) {
      updatedFilteredNews = updatedFilteredNews.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedFilter !== "All News") {
      if (selectedFilter === "Breaking News") {
        updatedFilteredNews = updatedFilteredNews.filter(
          (item) => item.breaking_news
        );
      } else if (selectedFilter === "Popular News") {
        updatedFilteredNews = updatedFilteredNews.filter(
          (item) => item.popular_news
        );
      } else if (selectedFilter === "Live News") {
        updatedFilteredNews = updatedFilteredNews.filter((item) => item.isLive);
      } else {
        updatedFilteredNews = updatedFilteredNews.filter(
          (item) => item.category === selectedFilter
        );
      }
    }

    // Filter by country
    if (selectedCountry !== "All Countries") {
      updatedFilteredNews = updatedFilteredNews.filter(
        (item) => item.region === selectedCountry
      );
    }

    // Optionally filter by date
    if (selectedDateFilter !== "All Dates") {
      const today = new Date();
      if (selectedDateFilter === "Today") {
        updatedFilteredNews = updatedFilteredNews.filter(
          (item) =>
            new Date(item.date_time).toDateString() === today.toDateString()
        );
      } else if (selectedDateFilter === "Last 7 Days") {
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        updatedFilteredNews = updatedFilteredNews.filter(
          (item) => new Date(item.date_time) >= lastWeek
        );
      } else if (selectedDateFilter === "Last 30 Days") {
        const lastMonth = new Date();
        lastMonth.setDate(today.getDate() - 30);
        updatedFilteredNews = updatedFilteredNews.filter(
          (item) => new Date(item.date_time) >= lastMonth
        );
      }
    }

    setFilteredNews(updatedFilteredNews);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const resetFilters = () => {
    setSelectedFilter("All News");
    setSelectedCountry("All Countries");
    setSelectedDateFilter("All Dates");
    setSearchTerm("");
    setFilteredNews(news);
  };

  if (loading || authLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pt-10 container mx-auto px-4">
      <LiveNews />
      <div className="p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">All News</h1>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:flex-1 bg-transparent glass text-gray-700"
          >
            <option>All News</option>
            <option>Breaking News</option>
            <option>Popular News</option>
            <option>Live News</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:flex-1 bg-transparent glass text-gray-700"
          >
            <option>All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            value={selectedDateFilter}
            onChange={(e) => setSelectedDateFilter(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:flex-1 bg-transparent glass text-gray-700"
          >
            <option>All Dates</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search news..."
            className="px-4 py-2 border rounded-md w-full md:flex-1 bg-transparent glass text-gray-700"
          />

          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 w-full md:w-auto"
          >
            Reset Filters
          </button>
        </div>

        {/* News Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNews.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 glass"
            >
              {/* Image and Title Link */}
              <Link to={`/news/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="flex justify-between items-center my-3">
                  <p className="text-sm text-gray-500 badge">{item.category}</p>
                  <p className="text-sm text-gray-300">
                    {new Date(item.date_time).toLocaleString()}
                  </p>
                </div>
                <h2 className="text-xl font-semibold mt-2 hover:underline">
                  {item.title}
                </h2>
              </Link>
              <hr className="my-4" />

              {/* Description with "See More" */}
              <p className="text-gray-300 mt-1">
                {item.description.length > 300 ? (
                  <>
                    {item.description.slice(0, 300)}...
                    <Link
                      to={`/news/${item._id}`}
                      className="text-blue-500 hover:text-blue-300"
                    >
                      {" "}
                      See More
                    </Link>
                  </>
                ) : (
                  item.description
                )}
              </p>

              {/* Buttons Section */}
              <div className="flex justify-between items-center text-xl md:text-2xl my-3">
                <MdFavoriteBorder />

                {/* Include the Bookmark component and pass newsId */}
                <Bookmark newsId={item._id} />

                <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${item._id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllNews;
