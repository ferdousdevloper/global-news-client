import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const CustomizableNews = ({ openFilter , handleFilter}) => {
  // console.log(openFilter);
  const [selectRegion, setSelectRegion] = useState('')
  const [selectCategory, setSelectCategory] = useState('')
  const [selectTopic, setSelectTopic] = useState('')
  console.log(selectRegion)
  console.log(selectCategory)
  console.log(selectTopic)

  const { data: news = [] } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data } = await axios.get('https://global-news-server-phi.vercel.app/news')
      return data;
    }
  })
  // console.log(news)


  // Extract unique regions, categories, and titles from the news array
  const region = [...new Set(news?.map((item) => item.region))];
  const category = [...new Set(news?.map((item) => item.category))];
  const title = [...new Set(news?.map((item) => item.title))];

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://global-news-server-phi.vercel.app/newss/filter?region=${selectRegion}&category=${selectCategory}&topic=${selectTopic}`
      );
      console.log(data);
      handleFilter()
    } catch (error) {
      console.error('Error fetching filtered news:', error);
    }
  };

  const handleReset = () => {
    setSelectRegion('')
    setSelectCategory('')
    setSelectTopic('')
  }





  return (
    <div
      className={`${openFilter ? "block md:flex" : "hidden md:hidden"
        } gap-4 md:gap-8 justify-end mt-[88px] absolute right-0`}
    >     
      <div className="dropdown dropdown-hover z-50">
        <select
          className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2"
          value={selectRegion}
          onChange={(e) => setSelectRegion(e.target.value)}
        >
          <option value='' className="disabled selected text-[#02AA08]">Region</option>
          {region?.map((reg) => (
            <option key={reg} className="text-[#02AA08]">
              {reg}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown dropdown-hover z-50">
        <select
          className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2"
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)}
        >
          <option value='' className="disabled selected text-[#02AA08]">Category</option>
          {category?.map((cat) => (
            <option key={cat} className="text-[#02AA08]">
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown dropdown-hover z-50">
        <select
          className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2"
          value={selectTopic}
          onChange={(e) => setSelectTopic(e.target.value)}
        >
          <option value='' className="disabled selected text-[#02AA08]">Topic</option>
          {title?.map((tit) => (
            <option key={tit} className="text-[#02AA08]">
              {tit}
            </option>
          ))}
        </select>
      </div>

      <div className="z-50">
        <button
          className="btn btn-outline hover:text-green-600"
          onClick={handleSearch}
        >search</button>
      </div>
      <div className="z-50">
        <button onClick={handleReset} className="btn btn-outline hover:text-green-600">reset</button>
      </div>
    </div>
  );
};

export default CustomizableNews;
