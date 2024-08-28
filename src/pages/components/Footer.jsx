import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer ">
      <div className="footer-content">
        <h2 className="footer-title">Let's Connect</h2>
        <div className="footer-links">
          <a 
            href="https://github.com/nottysukku" 
            className="footer-link github-link"
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/sukrit-chopra-5923a9215/" 
            className="footer-link linkedin-link"
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="footer-animation">
        <div className="animated-circle"></div>
      </div>
    </footer>
  );
}

export default Footer;
