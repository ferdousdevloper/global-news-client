/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import GotoTop from "./GotoTop";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div>
        <h1 className="text-center py-10 sm:py-20 text-3xl sm:text-4xl font-bold tracking-widest">
          <span className="text-[#02AA08]">Global</span> News
        </h1>
      </div>
      <div className="px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[800px] mx-auto">
          <h1 className="text-center sm:text-left text-lg sm:text-3xl">
            Get the Latest News Delivered Right to Your Inbox!
          </h1>
          <div className="flex w-full sm:w-auto">
            <input
              className="flex-grow px-4 py-2 rounded-l-xl w-full sm:w-auto"
              type="text"
              placeholder="Enter your email"
            />
            <button className="px-4 py-2 bg-red-600 text-white font-bold rounded-r-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <hr className="my-10 container mx-auto" />
      <footer className="px-4">
        <div className="container flex flex-col space-y-8 lg:space-y-0 lg:flex-row justify-between py-10 mx-auto">
          <div className=""></div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-full sm:grid-cols-4">
            <div className="space-y-3 text-center">
              <ul className="space-y-5">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Politics
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Sports
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Entertainment
                  </a>
                </li>
                <li>
                  <Link to="/category/gallery">Gallery</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3 text-center">
              <ul className="space-y-5">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    All news
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Tech
                  </a>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3 text-center">
              <ul className="space-y-5">
                <Link to="/category/about">
                  <a rel="noopener noreferrer" href="#">
                    About
                  </a>
                </Link>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    FAQ
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Advertise
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3 text-center">
              <div className="uppercase">Social media</div>
              <div className="flex space-x-5 text-2xl items-center justify-center">
                <FaFacebook />
                <FaTwitter />
                <FaInstagram />
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-center py-10 flex justify-around items-center">
          <span className="">
            © {moment().format("MMM Do YYYY")} Global News. All Rights Reserved
            (Team GAMMA)
          </span>
          <span>
            <GotoTop></GotoTop>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
