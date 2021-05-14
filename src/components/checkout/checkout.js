import axios from "axios";
import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./checkout.scss";
import CartContext from "../../Context/cart/cartContext";
import UserContext from "../../Context/user/userContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Alert from "../alertComponent/alert";
import Loader from "../loader/loader";

const Checkout = () => {
  // define all my state
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // define the alert state, loading, success
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [secretClient, setSecretClient] = useState("");
  // store a reference to stripe to access stripe
  const stripe = useStripe();
  const elements = useElements();

  // check if user is logged in
  // get the isLog from the userContext
  const { isLog, user } = useContext(UserContext);
  const [userDetail, setUserDetail] = useState({});

  // useEffect to fetch user if defined;

  useEffect(() => {
    let Mounted = false; //prevent memory leak
    if (isLog) {
      // then fetch the user
      axios
        .get(`http://localhost:5000/api/users/user/${user}`)
        .then((res) => {
          if (Mounted) return;
          if (res.data.user) {
            // set All the items to the data
            setUserDetail(res.data.user);
          } else {
            setAlert(true);
            setAlertMessage("intent error");
          }
        })
        .catch((err) => {
          if (Mounted) return;
          setAlert(true);
          setAlertMessage(err);
        });
    }
    return () => {
      Mounted = true;
    };
  }, [isLog, user]);

  // useEffect to create the payment intent
  // get the products from the context
  const { products, reset } = useContext(CartContext);

  useEffect(() => {
    // set variable again to prevent leak
    let isMounted = false;
    if (products.length === 0) {
      return (window.location.href = "http://localhost:3000");
    }
    axios
      .post("http://localhost:5000/api/stripe/paymentIntent", { products })
      .then((res) => {
        if (isMounted) return;
        if (res.data.message) {
          setAlert(true);
          setAlertMessage("error with intent");
        }
        if (res.data.secretClient) setSecretClient(res.data.secretClient);
      })
      .catch((err) => {
        if (isMounted) return;
        setAlert(true);
        setAlertMessage(err);
      });

    return () => {
      isMounted = true;
    };
  }, [products]);

  // create a function to change set the state based on input change
  const handleInputChange = (e) => {
    e.preventDefault();
    // create a switch function to check target name
    switch (e.target.name) {
      case "first":
        setFirst(e.target.value);
        return;
      case "last":
        setLast(e.target.value);
        return;
      case "email":
        setEmail(e.target.value);
        return;
      case "address":
        setAddress(e.target.value);
        return;
      case "city":
        setCity(e.target.value);
        return;
      case "state":
        setState(e.target.value);
        return;

      case "zip":
        setZip(e.target.value);
        return;

      default:
        return;
    }
  };

  // create a function to check email using regex
  const checkEmail = (email) => {
    // create regex to check email
    const reGex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reGex.test(String(email).toLowerCase());
  };
  // give a ref to the form to reset it
  const formRef = useRef();

  // define a value to check if stripe form is empty
  const [isStripeEmpty, setIsStripeEmpty] = useState(true);

  // create function to transform products items into string for database;

  const formatProducts = (prods) => {
    products.forEach((prod) =>
      prods.push(`${prod.qty} X ${prod.size} ${prod.name} .`)
    );
    return prods;
  };
  // create the function for form submit
  const handleFormSubmit = async (e) => {
    setAlert(false);
    e.preventDefault();

    const userInfo = {
      first,
      last,
      email,
      address,
      city,
      state,
      zip,
      id: userDetail ? userDetail.id : null,
    };

    // check the email
    const isEmail = checkEmail(userInfo.email);
    if (!isEmail) {
      setAlert(true);
      setAlertMessage("your email is not valid");
      formRef.current.reset();
      return;
    }
    // check if stripe form is filled;
    if (isStripeEmpty) {
      setAlert(true);
      setAlertMessage("enter payment details");
      return;
    }
    // display the loading at this point
    // before sending stripe request

    setLoading(true);
    const stripePayload = await stripe.confirmCardPayment(secretClient, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    //reset the form ;
    formRef.current.reset();

    // display error if request failed
    if (stripePayload.error) {
      // remove loading
      setLoading(false);
      setAlert(true);
      setAlert("payment error");
      return;
    } else {
      // call format products and send the request to save the order
      // turn the array into a string to save in database
      const items = formatProducts([]).join(" ");
      // get the total;
      const total = products.reduce((init, product) => {
        return init + product.qty * product.price;
      }, 0);
      const orderInfo = { ...userInfo, items, total };
      // send the request to save the order

      const sendOrder = await axios.post(
        "http://localhost:5000/api/cart/orders",
        {
          orderInfo,
        }
      );
      setLoading(false);

      if (!sendOrder) {
        setAlert(true);
        setAlertMessage("your order was not saved");
        return;
      }
      if (sendOrder.data.message === "success") {
        setAlert(true);
        setAlertMessage("your order has been placed");
        setTimeout(() => {
          reset(); // dispatch remove products from cart
        }, 1500);
      }
    }
  };

  // define the form style
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "monospace, Cambria, Cochin, Georgia",
        fontSize: "12px",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <>
      <section className="cart__checkout">
        <div className="cart__checkout-title">
          {!isLog && (
            <>
              <h3>Do you have an account?</h3>
              <p>login to track your order</p>
              <Link to="/users/login">Login</Link>
              <p> Or checkout as guest</p>
            </>
          )}
        </div>
        <form
          className="cart__checkout-form"
          onChange={handleInputChange}
          onSubmit={handleFormSubmit}
          ref={formRef}
        >
          <div className="form__container">
            <input
              type="text"
              placeholder={isLog ? userDetail.firstname : "first"}
              name="first"
              required
            />
            <input
              type="text"
              placeholder={isLog ? userDetail.lastname : "last"}
              name="last"
              required
            />
            <input
              type="email"
              placeholder={isLog ? userDetail.email : "email"}
              name="email"
              required
            />
            <input
              type="text"
              placeholder={isLog ? userDetail.address : "address"}
              name="address"
              required
            />
            <input
              type="text"
              placeholder={isLog ? userDetail.city : "city"}
              name="city"
              required
            />
            <input
              type="text"
              placeholder={isLog ? userDetail.state : "state"}
              name="state"
              required
            />
            <input
              type="text"
              placeholder={isLog ? userDetail.zip : "zip"}
              name="zip"
              required
            />
          </div>
          <p style={{ textAlign: "center" }}>Payments Details</p>
          <div className="stripe__form">
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={() => {
                setIsStripeEmpty(false);
              }}
            />
          </div>

          <button>Pay</button>
        </form>
      </section>
      {alert && <Alert alertText={alertMessage} />}
      {loading && (
        <div className="loader_div">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Checkout;
