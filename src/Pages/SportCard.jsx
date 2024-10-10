
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import ShareDropdown from "../Components/Home/ShareDropdown";
import Bookmark from "../Components/Bookmark";

const SportCard = ({ news }) => {
    const {
        _id,
        title,
        image,
        category,
        region,
        description,
        timestamp,
    } = news;

    return (
        <div
            key={_id}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 glass text-gray-300"
        >
            {/* Image and Title Link */}
            <Link to={`/news/${_id}`}>
                <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
                <div className="flex justify-between items-center my-3">
                    <p className="text-sm text-gray-500 badge">{category}</p>
                    <p className="text-sm">{new Date(timestamp).toLocaleString()}</p>
                </div>
                <h2 className="text-xl font-semibold mt-2 hover:underline line-clamp-2 min-h-14">{title}</h2>
            </Link>
            <hr className="my-4" />

            {/* Description with "See More" */}
            <p className="text-gray-300 mt-1">
                {description.length > 300 ? (
                    <>
                        {description.slice(0, 300)}...
                        <Link to={`/news/${_id}`} className="text-blue-500 hover:text-blue-300">
                            {" "}
                            See More
                        </Link>
                    </>
                ) : (
                    description
                )}
            </p>

            {/* Additional info like Region */}
            <p className="mt-1">Region: {region}</p>

            {/* Buttons Section */}
            <div className="flex justify-between items-center text-xl md:text-2xl my-3 text-slate-100">
                <MdFavoriteBorder />
                <Bookmark newsId={news._id} />
                <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${news._id}`} />
            </div>
        </div>
    );
};

export default SportCard;
