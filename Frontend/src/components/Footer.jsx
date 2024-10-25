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
      <footer>
        <div>
          <img src="https://res.cloudinary.com/chai-or-code/image/upload/v1724740409/logo_mcistt.png" alt="Job0Clock logo" />
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Raipur, Chhattisgarh (INDIA)</li>
            <li>
              <Link target="_blank" to="mailto:varunsahu0707@gmail.com">
                <FaEnvelopeSquare /> Mail us
              </Link>
            </li>
            <li>
              <Link to="tel:+918435919749">
                <FaPhoneSquare /> Call us: 8435919749
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to="https://twitter.com" target="_blank">
                <FaTwitterSquare />
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link to="https://instagram.com" target="_blank">
                <FaInstagramSquare />
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to="https://youtube.com" target="_blank">
                <FaYoutubeSquare />
                <span>Youtube</span>
              </Link>
            </li>
            <li>
              <Link to="https://linkedin.com" target="_blank">
                <FaLinkedin />
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; CopyRight 2024. All Rights Reserved By Job0Clock
      </div>
    </>
  );
};

export default Footer;
