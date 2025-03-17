import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTwitterSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaLinkedin,
  FaPhoneSquare,
  FaEnvelopeSquare,
} from "react-icons/fa";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log("isAuthenticated: ", isAuthenticated);
  
  return (
    <>
      <footer className="bg-black flex flex-wrap border-b border-gray-500 p-10">
        <div className="w-full md:w-1/4 pr-5 flex justify-center items-center mb-5 md:mb-0">
          <img src="https://res.cloudinary.com/chai-or-code/image/upload/v1724740409/logo_mcistt.png" alt="Job0Clock logo" className="w-52" />
        </div>
        <div className="w-full md:w-1/4 pr-5 mb-5 md:mb-0">
          <h4 className="text-white font-bold tracking-wide text-xl mb-5">Support</h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>Raipur, Chhattisgarh (INDIA)</li>
            <li>
              <Link target="_blank" to="mailto:varunsahu0707@gmail.com" className="flex items-center gap-2 transition duration-300 hover:text-yellow-500">
                <FaEnvelopeSquare /> Mail us
              </Link>
            </li>
            <li>
              <Link to="tel:+918435919749" className="flex items-center gap-2 transition duration-300 hover:text-yellow-500">
                <FaPhoneSquare /> Call us: 8435919749
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 pr-5 mb-5 md:mb-0">
          <h4 className="text-white font-bold tracking-wide text-xl mb-5">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>
              <Link to="/" className="transition duration-300 hover:text-yellow-500">Home</Link>
            </li>
            <li>
              <Link to="/jobs" className="transition duration-300 hover:text-yellow-500">Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/dashboard" className="transition duration-300 hover:text-yellow-500">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="w-full md:w-1/4 pr-5">
          <h4 className="text-white font-bold tracking-wide text-xl mb-5">Follow Us</h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>
              <Link to="https://twitter.com" target="_blank" className="flex items-center gap-2 transition duration-300 hover:text-yellow-500">
                <FaTwitterSquare />
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link to="https://instagram.com" target="_blank" className="flex items-center gap-2 transition duration-300 hover:text-yellow-500">
                <FaInstagramSquare />
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to="https://youtube.com" target="_blank" className="flex items-center gap-2 transition duration-300 hover:text-yellow-500">
                <FaYoutubeSquare />
                <span>Youtube</span>
              </Link>
            </li>
            <li>
              <Link to="https://linkedin.com" target="_blank" className="flex items-center gap-2 transition duration-300 hover:text-yellow-500">
                <FaLinkedin />
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="bg-black flex justify-center text-center text-gray-400 font-light p-5">
        &copy; CopyRight 2024. All Rights Reserved By Job0Clock
      </div>
    </>
  );
};

export default Footer;
