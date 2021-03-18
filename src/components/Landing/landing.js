import "./landing.scss";
import SlideShow from "../slideShow/slideShow";
import burgundy from "../../assets/img/burgundy.jpg";
const Landing = () => {
  return (
    <>
      <SlideShow />

      <section className="best__seller">
        <h1> Best sellers</h1>
        <div className="best__seller-container">
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
        </div>
      </section>
      <section className="newsletter">
        <div className="newsletter__container">
          <h3>Sign up to our newsLetter</h3>
          <form>
            <input
              type="text"
              name="newsletter"
              placeholder="enter your email please"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Landing;
