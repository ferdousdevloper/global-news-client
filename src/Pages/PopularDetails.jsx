import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const PopularDetails = () => {
    const [populars, setPopulars] = useState(null);
    const popularData = useLoaderData()
    console.log(popularData)
    const { title, image, description, category, author, authorName, region, timestamp } = popularData;

    // get latest news
    const { data: latest = [] } = useQuery({
        queryKey: ['latestNews'],
        queryFn: async () => {
            const { data } = await axios.get('https://global-news-server-phi.vercel.app/newss/latestNews')
            return data;
        }
    })


    useEffect(() => {
        fetch('https://global-news-server-phi.vercel.app/news')
            .then(response => response.json())
            .then(data => setPopulars(data.slice(0, 7)))
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

  

    return (
        <div className='mt-28 md:grid grid-cols-9'>

            <div className='col-span-6'>
                <h2 className='text-2xl font-bold py-6 text-white'>{title}</h2>
                <img className='w-full' src={image} alt="" />
                <div className='flex gap-3 text-center text-gray-400 italic'>
                    <h2>Author:{authorName ? authorName : 'admin'}</h2>
                    <h2>Category:{category}</h2>
                    <h2>Date:{new Date(timestamp).toLocaleDateString()}</h2>
                    <h2>Post on:{new Date(timestamp).toLocaleTimeString()}</h2>
                </div>

                <hr className='border-[#02AA08] pb-5' />
                <p className='text-[#d8cece]'>{description}</p>
            </div>

            <div className='col-span-3'>

                <section className="">
                    <div className="container mx-auto flex flex-col p-6">
                        <Tabs>
                            <TabList>
                                <Tab>
                                    <h2 className="py-4 text-2xl font-bold text-center text-white">Latest News</h2>
                                </Tab>
                                <Tab>
                                    <h2 className="py-4 text-2xl font-bold text-center text-white">Popular News</h2>
                                </Tab>
                            </TabList>

                            <TabPanel>
                                <div className="divide-y  dark:divide-[#02AA08] mb-4">

                                    {
                                        latest?.map(ltNews => <div className="grid justify-center grid-cols-4 mx-auto space-y-8 lg:space-y-0 md:pt-5">
                                            <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                                                <img className='md:h-full md:py-2' src={ltNews.image} alt="" />
                                            </div>
                                            <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                                                <span className="text-xs tracking-wider uppercase text-[#02AA08]">{new Date(ltNews.timestamp).toLocaleTimeString()} ,  {new Date(ltNews.timestamp).toLocaleDateString()} </span>
                                                <span className="text-sm font-bold md:text-sm text-[#d8cece]">{ltNews.title}</span>
                                                <span className="mt-4 text-gray-400">{ltNews.description.slice(0, 50)}.... </span>
                                            </div>
                                        </div>)
                                    }

                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="divide-y  dark:divide-[#02AA08] mb-4">

                                    {
                                        populars?.map(ltNews => <Link to={`/category/${ltNews._id}`}><div className="grid justify-center grid-cols-4 mx-auto space-y-8 lg:space-y-0 md:pt-5">
                                            <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                                                <img className='md:h-full md:py-2' src={ltNews.image} alt="" />
                                            </div>
                                            <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                                                <span className="text-xs tracking-wider uppercase text-[#02AA08]">{new Date(ltNews.timestamp).toLocaleTimeString()} ,  {new Date(ltNews.timestamp).toLocaleDateString()} </span>
                                                <span className="text-sm font-bold md:text-sm text-[#d8cece]">{ltNews.title}</span>
                                                {/* <span className="mt-4 text-gray-400">{ltNews.description.slice(0, 50)}.... </span> */}
                                            </div>
                                        </div></Link>)
                                    }

                                </div>
                            </TabPanel>
                        </Tabs>

                    </div>
                </section>

            </div>

        </div>
    );
};

export default PopularDetails;