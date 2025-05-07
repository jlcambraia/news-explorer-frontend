import "./Footer.css";
import githubIcon from "../../images/github-icon.png";
import linkedinIcon from "../../images/linkedin-icon.png";

import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <p className="footer__copyrights">
        &copy; 2025 João Luiz Cambraia, Powered by News API
      </p>
      <div className="footer__navigation">
        <p onClick={() => navigate("/")} className="footer__navigation-link">
          Home
        </p>
        <a
          className="footer__navigation-link"
          href="https://tripleten.com/pt-bra/"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          TripleTen
        </a>
        <div className="footer__navigation-icons">
          <a
            className="footer__navigation-anchor"
            href="https://github.com/jlcambraia/"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <img
              className="footer__navigation-icon"
              src={githubIcon}
              alt="Ícone do GitHub"
            />
          </a>
          <a
            className="footer__navigation-anchor"
            href="https://www.linkedin.com/in/joaoluizcambraia/"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <img
              className="footer__navigation-icon"
              src={linkedinIcon}
              alt="Ícone do Facebook"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
