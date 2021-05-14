import "./landing.scss";
import SlideShow from "../slideShow/slideShow";

import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import Alert from "../alertComponent/alert";
import { useState } from "react";
import axios from "axios";

const Landing = ({ data }) => {
  // set the alert state
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // define the subrscribe state
  const [email, setEmail] = useState("");
  // create a function to check email using regex
  const checkEmail = (email) => {
    // create regex to check email
    const reGex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reGex.test(String(email).toLowerCase());
  };

  // define the subscribe to newsLetter function
  const subscribeToLetter = (e) => {
    e.preventDefault();
    const isEmail = checkEmail(email);
    if (!isEmail) {
      setAlert(true);
      setAlertMessage("your email is not valid");
      return;
    }
    axios
      .post("http://localhost:5000/api/users/news", { email })
      .then((res) => {
        if (res.data.message) {
          setAlert(true);
          setAlertMessage("can't register your email.. try Later");
          return;
        }
        if (res.data.success) {
          setAlert(true);
          setAlertMessage("Email Added. Welcome to the dozo community");
        }
      })
      .catch((err) => {
        setAlert(true);
        setAlertMessage(err);
      });
  };
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

          <form
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            onSubmit={subscribeToLetter}
          >
            <input
              type="text"
              name="newsletter"
              placeholder="enter your email"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
      {alert && <Alert alertText={alertMessage} />}
    </>
  );
};

export default Landing;
