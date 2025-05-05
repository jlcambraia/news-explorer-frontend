import "./Footer.css";
import githubIcon from "../../images/github-icon.png";
import facebookIcon from "../../images/facebook-icon.png";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyrights">
        &copy; 2025 Supersite, Powered by News API
      </p>
      <div className="footer__navigation">
        <p className="footer__navigation-link">Home</p>
        <p className="footer__navigation-link">TripleTen</p>
        <div className="footer__navigation-icons">
          <img
            className="footer__navigation-icon"
            src={githubIcon}
            alt="Ícone do GitHub"
          />
          <img
            className="footer__navigation-icon"
            src={facebookIcon}
            alt="Ícone do Facebook"
          />
        </div>
      </div>
    </footer>
  );
}
