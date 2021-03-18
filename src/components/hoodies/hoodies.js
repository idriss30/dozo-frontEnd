import "./hoodies.scss";
import sweat from "../../assets/img/whiteJack-front.jpg";
import { Link } from "react-router-dom";

const Hoodies = () => {
  return (
    <>
      <section className="hoodies">
        <div className="hoodies__container">
          <div className="hoodies__container-display">
            <Link to="/">
              <img src={sweat} />
            </Link>
            <h1>hoodies FOR MEN </h1>
            <p>
              WHETHER IT’S A DENIM JACKET OR A LEATHER BIKER JACKET FOR EVERY
              DAY OR A WINDBREAKER JACKET OR PARKA FOR AN OUTDOORS EVENT, OUR
              JACKET SELECTION TAPS INTO THE MINDSET OF MODERN DESIGN
              APPRECIATION WITH NOTES OF PRACTICALITY.
            </p>
          </div>
          <div className="hoodies__container-all">
            <div className="hoodies__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="hoodies__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="hoodies__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="hoodies__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="hoodies__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="hoodies__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="hoodies__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="hoodies__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hoodies;
