import "./landing.scss";
import SlideShow from "../slideShow/slideShow";

import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

const Landing = ({ data }) => {
  return (
    <>
      <SlideShow items={data} />

      <section className="best__seller">
        <h1> Best sellers</h1>
        <ScrollAnimation
          animateIn="animate__animated animate__fadeIn"
          animateOut="animate__animated animate__fadeOut"
          duration={1}
        >
          <div className="best__seller-container">
            {data.map((product) => {
              return (
                <div
                  className="best__seller-container-display"
                  key={product.id}
                >
                  <Link to={`/shop/products/${product.id}`}>
                    <img
                      src={`/assets/img/${product.imageName}-front.jpg`}
                      alt={product.name}
                    />
                  </Link>

                  <p>{product.name}</p>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </div>
              );
            })}
          </div>
        </ScrollAnimation>
      </section>
      <section className="newsletter">
        <div className="newsletter__container">
          <ScrollAnimation animateIn="animate__animated animate__flash">
            <h3> Sign up to our newsLetter</h3>
          </ScrollAnimation>

          <form>
            <input
              type="text"
              name="newsletter"
              placeholder="enter your email"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Landing;
