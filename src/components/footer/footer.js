import "./footer.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__container-company">
            <ul>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/terms">Terms of use</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy policy</Link>
              </li>
            </ul>
          </div>
          <div className="footer__container-disclaimer">
            <p>portfolio concept, just a mockup</p>
            <p>The images were taken from a store on alibaba</p>
            <p>I do not support, nor condemn the material presented </p>
          </div>
          <div className="footer__container-follow">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-square"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div>
            <span>DOZO</span>
            <span>|</span>
            <span>USA</span>
          </div>
          <div>
            <span>
              All rights reserved
              {/* <img
                src="https://img.icons8.com/emoji/48/000000/copyright-emoji.png"
                alt="copyright"
              /> */}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
