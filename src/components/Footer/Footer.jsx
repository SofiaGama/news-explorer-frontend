import "./Footer.css";
import gitHubIcon from "../../assets/images/github.svg";
import facebookIcon from "../../assets/images/fb.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2025 Supersite, desenvolvido pela News API
      </p>
      <nav className="footer__nav">
        <ul className="footer__links">
          <li>
            <a className="footer__link" href="/" target="_blank">
              Início
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://practicum.com"
              target="_blank"
              rel="noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__social">
          <li>
            <a
              className="footer__social-link"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={gitHubIcon} alt="GitHub" />
            </a>
          </li>
          <li>
            <a
              className="footer__social-link"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
