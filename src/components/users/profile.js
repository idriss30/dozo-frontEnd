import "./profile.scss";
import { Link, useHistory } from "react-router-dom";
import map from "../../assets/usmap.png";
import { useEffect, useState } from "react";

import axios from "axios";
import UserContext from "../../Context/user/userContext";
import { useContext } from "react";

// define  the session expired components

const ExpiredSession = () => {
  // useEffect to set a 3second timer
  useEffect(() => {
    let timer = () => {
      setTimeout(() => {
        setIsDisplay(false);
        window.location.href = "http://localhost:3000/users/login";
      }, 3000);
    };
    let timerId = timer();

    return () => {
      clearTimeout(timerId); // clear on unmount
    };
  }, []);

  const [isDisplay, setIsDisplay] = useState(true);
  return (
    <div className="expired">
      {isDisplay && (
        <div className="expired__container">
          <span
            onClick={() => {
              setIsDisplay(false);
              window.location.href = "http://localhost:3000/users/login";
            }}
          >
            X
          </span>
          <p>sorry your session has expired consider login instead</p>
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const [userInfo, setUserInfo] = useState();
  // define an isToken to display the error to the user
  const [isNotToken, setisNotToken] = useState(false);

  // define history
  const history = useHistory();
  // useEffect to fetch the user

  useEffect(() => {
    let isUnMounted = false; // prevent memory leak on unmounted component
    axios
      .get("http://localhost:5000/api/users/profile", { withCredentials: true })
      .then((res) => {
        // if no cookie do redirect
        if (res.data.message === "cookie-fail") {
          history.push("/users/login");
        } else if (res.data.message === "invalid-token") {
          if (isUnMounted) return;
          setisNotToken(true); // token is invalid so display message to user
        } else {
          if (res.data.user) {
            if (isUnMounted) return;
            setUserInfo({ ...res.data.user });
          }
        }
      })
      .catch((error) => console.log(error));

    return () => {
      isUnMounted = true;
    };
  }, [history]);

  // define the info display state and order display state
  const [infoDisplay, setInfoDisplay] = useState(true);
  const [orderDisplay, setOrderDisplay] = useState(false);

  // define all state elements of the form
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState();

  // define the onChangeForm
  const onChangeForm = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "firstname":
        setFirstName(e.target.value);
        break;
      case "lastname":
        setLastname(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      case "email":
        setEmail(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "state":
        setState(e.target.value);
        break;
      case "zip":
        setZip(e.target.value);
        break;
      default:
        return;
    }
  };

  // create a function for the form submit
  // get the context to dispatch
  const { user, updateUser, reset, deleteUser } = useContext(UserContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // create the userObject before dispatching the action
    const userObject = {
      firstname,
      lastname,
      email,
      password,
      address,
      city,
      state,
      zip,
    };
    updateUser(user, userObject);
  };

  /// manage orders view
  // define orderArray
  const [orders, setOrders] = useState([]);
  // define a function to manage orderClick
  const handleOrderSection = (e) => {
    // prevent the default behavior
    e.preventDefault();
    setOrderDisplay(true);
    setInfoDisplay(false);
    //send the axios request
    axios
      .get(`http://localhost:5000/api/cart/orders/${userInfo.id}`)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => alert(err));
  };
  return (
    <section className="profile">
      {userInfo && (
        <>
          <h1>Welcome {userInfo.firstname}</h1>

          <div className="profile__container">
            <div className="profile__container-nav">
              <Link
                style={{ borderRight: "2px solid", paddingRight: "1rem" }} // define little border on the side;
                to="/"
                onClick={handleOrderSection}
              >
                Orders
              </Link>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  setOrderDisplay(false);
                  setInfoDisplay(true);
                }}
              >
                Your info
              </Link>
            </div>
            {infoDisplay && (
              <div className="profile__container-form">
                <form onChange={onChangeForm} onSubmit={handleFormSubmit}>
                  <div className="form__container">
                    <input
                      type="text"
                      name="firstname"
                      placeholder={userInfo.firstname}
                      required
                    />
                    <input
                      type="text"
                      name="lastname"
                      placeholder={userInfo.lastname}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder={userInfo.email}
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder={userInfo.address}
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder={userInfo.city}
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder={userInfo.state}
                      required
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder={userInfo.zip}
                      required
                    />
                  </div>
                  <div>
                    <img src={map} alt="map" />
                  </div>

                  <div>
                    <button>Update</button>
                  </div>
                </form>
              </div>
            )}

            {orderDisplay && (
              <>
                {orders.length > 0 ? (
                  <div className="profile__container-orders">
                    {orders.map((order) => {
                      return (
                        <div key={order.id + Math.random()}>
                          {console.log(order.createdAt.toString())}
                          <p>order number : {order.id.split("-")[0]}</p>
                          <p>Created on {order.createdAt.split("T")[0]}</p>
                          <p>total: ${order.totalOrder}</p>
                          <p>Items : {order.items}</p>
                          <hr />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ` sorry ${userInfo.firstname} you do not have any order`
                )}
              </>
            )}

            <div className="profile__container-buttons">
              <button
                className="profile__delete"
                onClick={() => {
                  deleteUser(user);
                }}
              >
                Delete your account
              </button>

              <button className="profile__signout " onClick={reset}>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
      {isNotToken && <ExpiredSession />}
    </section>
  );
};

export default Profile;
