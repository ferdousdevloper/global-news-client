import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import GalleryCard from "../Components/GalleryCard";

const Gallery = () => {

  const { data: images = [] } = useQuery({
    queryKey: ['image'],
    queryFn: async () => {
      const { data } = await axios.get('https://global-news-server-phi.vercel.app/news')
      return data;
    }
  })

  const splitIntoFrames = (images, imagesPerFrame) => {
    let frames = [];
    for (let i = 0; i < images.length; i += imagesPerFrame) {
      frames.push(images.slice(i, i + imagesPerFrame));
    }
    return frames;
  };

  const frames = splitIntoFrames(images, 19);
  // console.log(frames)



  return (
    <div className="md:container md:mx-auto py-10 mb-20">
      <h2 className='h-full mt-20 text-center text-3xl font-semibold text-white py-6 '>Our News Gallery</h2>

      {
        frames?.map(frame => <GalleryCard
          key={frame._id}
          frame={frame}
        ></GalleryCard>)
      }


      {/* <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
        <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
          <img
            src="https://source.unsplash.com/random/301x301/"
            alt=""
            className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square"
          />
          <img
            alt=""
            className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
            src="https://source.unsplash.com/random/200x200/?0"
          />
          <img
            alt=""
            className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
            src="https://source.unsplash.com/random/200x200/?1"
          />
          <img
            alt=""
            className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
            src="https://source.unsplash.com/random/200x200/?2"
          />
          <img
            alt=""
            className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
            src="https://source.unsplash.com/random/200x200/?3"
          />
          <img
            alt=""
            className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
            src="https://source.unsplash.com/random/200x200/?4"
          />
          <img
            alt=""
            className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
            src="https://source.unsplash.com/random/200x200/?5"
          />
          <img
            alt=""
            className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
            src="https://source.unsplash.com/random/200x200/?6"
          />
          <img
            alt=""
            className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
            src="https://source.unsplash.com/random/200x200/?7"
          />
          <img
            src="https://source.unsplash.com/random/302x302/"
            alt=""
            className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 aspect-square"
          />
        </div>
      </section> */}
    </div>
  );
};

export default Gallery;
