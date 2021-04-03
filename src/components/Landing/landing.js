import "./landing.scss";
import SlideShow from "../slideShow/slideShow";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import Loader from "../loader/loader";
import useCustomFetch from "../../Hooks/useCustomFetch";
import Error from "../errors/errors";

const Landing = () => {
  const state = useCustomFetch("http://localhost:5000/api/shop/bestSellers", {
    bestSellers: [],
  });

  const { loading, isError, data } = state;
  return (
    <>
      {loading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <div>
          <SlideShow items={data.bestSellers} />

          <section className="best__seller">
            <h1> Best sellers</h1>
            <ScrollAnimation
              animateIn="animate__animated animate__fadeIn"
              animateOut="animate__animated animate__fadeOut"
              duration={1}
            >
              <div className="best__seller-container">
                {data.bestSellers.map((product) => {
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
                  placeholder="enter your email please"
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Landing;
