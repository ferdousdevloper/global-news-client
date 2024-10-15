import React, { useEffect } from "react";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import PopularNewsCard from "../PopularNewsCard";

const PopulerNews = () => {
  const [populars, setPopulars] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/news')
      .then(response => response.json())
      .then(data => setPopulars(data))
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  console.log(populars);

  return (
    <div
      className="md:container glass p-4 rounded-xl mx-auto my-10 border-t-2 border-[#02AA08] pt-8"
      style={{ width: "85%" }}
    >
      <h2 className="-mt-8 text-3xl font-bold mb-4 pt-4 text-slate-50 ">
        Populars News
      </h2>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
          },
          1600: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={600}
        loop={true}
        modules={[Autoplay, FreeMode, Pagination]}
        className="mySwiper"
      >
        {populars?.map((news) =>
          news.popular_news === true ? (
            <SwiperSlide key={news.id} className="lg:w-9/12 w-full bg-neutral-950 glass p-2 rounded-xl">
              <PopularNewsCard news={news}></PopularNewsCard>
            </SwiperSlide>
          ) : (
            ""
          )
        )}
      </Swiper>
    </div>
  );
};

export default PopulerNews;
