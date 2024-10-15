import React, { useEffect, useState } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ShareDropdown from './Home/ShareDropdown';
import { auth } from '../firebase/firebase.config';
import Swal from 'sweetalert2';
import axios from 'axios';




const PopularNewsCard = ({ news }) => {
    console.log(news)
    const { _id, image, category, title, date_time, description } = news
    const { user, loading: authLoading } = auth || {};
    const [newss, setNewss] = useState([]);
    const [bookmarked, setBookmarked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("http://localhost:3001/news");
                setNewss(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load news data");
                setLoading(false);
            }
        };

        fetchNews();
        const storedBookmarks = localStorage.getItem("bookmarkedNews");
        if (storedBookmarks) {
            setBookmarked(JSON.parse(storedBookmarks));
        }
    }, []);

    const handleBookmark = async (newsId, e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Not Authenticated",
                text: "Please login to bookmark news.",
                confirmButtonText: "OK",
            });
            return;
        }


        try {
            const alreadyBookmarked = bookmarked.includes(newsId);
            const updatedBookmarks = alreadyBookmarked
                ? bookmarked.filter((id) => id !== newsId)
                : [...bookmarked, newsId];

            setBookmarked(updatedBookmarks);
            localStorage.setItem("bookmarkedNews", JSON.stringify(updatedBookmarks));

            const url = alreadyBookmarked
                ? "http://localhost:3001/remove-bookmark"
                : "http://localhost:3001/bookmark";

            await axios.post(url, { email: user.email, newsId });

            Swal.fire({
                icon: "success",
                title: alreadyBookmarked ? "Bookmark Removed!" : "Bookmarked!",
                text: alreadyBookmarked
                    ? "This item has been removed from your bookmarks."
                    : "This item has been added to your bookmarks.",
                confirmButtonText: "OK",
                timer: 2000,
            });
        } catch (error) {
            console.error("Error bookmarking:", error);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "There was an error trying to bookmark this item. Please try again.",
                confirmButtonText: "OK",
            });
        }
    };


    return (

        <div className="border p-4 rounded-lg shadow-lg glass flex flex-col h-full min-h-[400px]">

            <div className="w-full border p-1 rounded-lg shadow-lg glass flex flex-col h-full min-h-[400px]">

                <Link to={`/news/${_id}`}>
                    <img src={image} alt={title} className="w-full h-40 object-cover mb-4 rounded-md" />
                </Link>

                <div className="w-full flex-grow flex flex-col min-h-[250px]">
                    <h3 className="text-base badge font-semibold mb-1 ">{category}</h3>
                    <Link to={`/news/${_id}`}>
                        <h2 className="text-xl font-bold mb-2 text-slate-50 hover:underline">{title}</h2>
                    </Link>
                    <p className="text-sm mb-2 text-slate-100">{new Date(date_time).toLocaleDateString()}</p>
                    <p className="text-slate-100 flex-grow">
                        {description.length > 80 ? (
                            <>
                                {description.slice(0, 80)}...
                            </>
                        ) : (
                            description
                        )}
                    </p>
                </div>


                <div className="flex justify-between items-center text-xl md:text-2xl mt-auto pt-4 text-slate-100">
                    <MdFavoriteBorder />
                    <CiBookmark
                        className={`cursor-pointer ${bookmarked.includes(_id) ? "text-green-500" : ""}`}
                        onClick={(e) => handleBookmark(_id, e)}
                    />
                    <ShareDropdown url={`http://localhost:3001/news/${_id}`} />
                </div>
            </div>





            {/* <figure className='h-52'>
                <img
                    className='w-full h-52'
                    src={image}
                    alt="popular news" />

            </figure>
            <div className="card-body">
                <h2 className="card-title">{category}</h2>
                <p>{title}</p>
            </div> */}
        </div>

    );
};

export default PopularNewsCard;