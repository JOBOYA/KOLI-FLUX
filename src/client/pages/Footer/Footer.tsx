import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLinkedin, FaGithub } from "react-icons/fa";

//footer component
const Footer: React.FC = () => {
  return (
    <div className="footer">

      <div className="footer__icons">

        <a href="https://www.facebook.com/">
          <FaFacebook className="footer__icon" />
        </a>
        <a href="https://www.instagram.com/">
          <FaInstagram className="footer__icon" />
        </a>
        <a href="https://twitter.com/">
          <FaTwitter className="footer__icon" />
        </a>
        <a href="https://www.linkedin.com/">
          <FaLinkedin className="footer__icon" />
        </a>
        <a href=" 
    
    ">
          <FaGithub className="footer__icon" />
        </a>
      </div>
      <div className="footer__text">
        <p>© 2023 KOLIFLUX</p>
      </div>
    </div>
  );
};

export default Footer;