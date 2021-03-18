import "./bottoms.scss";
import sweat from "../../assets/img/whiteJack-front.jpg";
import { Link } from "react-router-dom";

const Bottoms = () => {
  return (
    <>
      <section className="bottoms">
        <div className="bottoms__container">
          <div className="bottoms__container-display">
            <Link to="/">
              <img src={sweat} />
            </Link>
            <h1>bottoms FOR MEN </h1>
            <p>
              WHETHER IT’S A DENIM JACKET OR A LEATHER BIKER JACKET FOR EVERY
              DAY OR A WINDBREAKER JACKET OR PARKA FOR AN OUTDOORS EVENT, OUR
              JACKET SELECTION TAPS INTO THE MINDSET OF MODERN DESIGN
              APPRECIATION WITH NOTES OF PRACTICALITY.
            </p>
          </div>
          <div className="bottoms__container-all">
            <div className="bottoms__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="bottoms__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="bottoms__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="bottoms__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="bottoms__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="bottoms__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="bottoms__container-all-display">
              <img src={sweat} />
              <p>New</p>
              <p>beautiful coat</p>
              <p>$100</p>
            </div>
            <div className="bottoms__container-all-display">
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

export default Bottoms;
