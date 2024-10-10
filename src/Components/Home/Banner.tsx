import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './BannerSlider.css'; // Your custom styles

interface NewsItem {
  id: string;
  image: string;
  title: string;
  date_time: string;
  breaking_news: boolean;
}

const Banner: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Fetch the data from the dummy JSON file
    fetch('https://global-news-server-phi.vercel.app/news')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Filter breaking news and sort by latest date_time
        const latestBreakingNews = data
          .filter((item: NewsItem) => item.breaking_news)
          .sort((a: NewsItem, b: NewsItem) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime());
        
        setNews(latestBreakingNews.slice(0, 5)); // Get the top 5 latest breaking news
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="banner-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.image} alt={item.title} className="banner-image max-h-[700px]" />
            <div className="swiper-slide-content bg-black bg-opacity-50 text-white p-4 absolute bottom-0 w-full">
              {/* Optional content if you want to add titles or anything on the image */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;