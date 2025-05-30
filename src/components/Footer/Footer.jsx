import "./Footer.css";
import githubIcon from "../../assets/images/icons/github-icon.svg";
import linkedinIcon from "../../assets/images/icons/linkedin-icon.svg";

import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  function getCurrentYear() {
    const today = new Date();
    const year = today.getFullYear();
    return year;
  }

  return (
    <footer className="footer">
      <p className="footer__copyrights">
        &copy; {getCurrentYear()} João Luiz Cambraia, com tecnologia da News API
      </p>
      <div className="footer__navigation">
        <div className="footer__navigation-links">
          <p onClick={() => navigate("/")} className="footer__navigation-link">
            Início
          </p>
          <a
            className="footer__navigation-link"
            href="https://tripleten.com/pt-bra/"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            TripleTen
          </a>
        </div>

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
