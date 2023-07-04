import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <ul className="social_list">
        <li>
          <a
            href="https://twitter.com/educawebvideos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter
              className="social_icon"
              aria-label="Siga-nos no Twitter"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              className="social_icon"
              aria-label="Siga-nos no Instagram"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              className="social_icon"
              aria-label="Siga-nos no Linkedin"
            />
          </a>
        </li>
      </ul>
      <p className="copy_right">
        &copy; 2023 Copyright:
        <span className="educaweb"> educaweb.com</span>
      </p>
    </footer>
  );
}
