import { useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";
import CartContext from "../../Context/cart/cartContext";
import UserContext from "../../Context/user/userContext";
const NavBar = () => {
  // toggle the navbar
  const [isToggle, setToggle] = useState(false);
  // toggle the search bar
  const [isSearching, setSearching] = useState(false);
  // toggle the cart
  const [cartShow, setCartShow] = useState(false);

  // get the cart quantity from the context
  const { qty, products, removeFromCart } = useContext(CartContext);

  // add a function to manage overflow on state change
  const switchToggleState = (elementToSwitch) => {
    if (elementToSwitch) {
      document.body.style.overflow = "initial";
      setToggle(false);
    } else {
      document.body.style.overflow = "hidden";
      setToggle(true);
    }
  };

  // create a function to handle the navbar state
  const toggleNav = (e) => {
    e.preventDefault();
    switchToggleState(isToggle);
  };

  // create a function to toggle search state
  const toggleSearch = (e) => {
    e.preventDefault();
    setSearching(!isSearching);
  };

  // create a function to handle the cart toggle
  const toggleCart = (e) => {
    e.preventDefault();
    if (qty > 0) {
      setCartShow(true);
    }
    return;
  };
  // display the total instead of right navigation
  // define the navRef to toggle hide
  const navigationRightRef = useRef();

  const location = window.location.href;
  useEffect(() => {
    if (location === "http://localhost:3000/shop/cart") {
      navigationRightRef.current.style.display = "none";
    } else {
      navigationRightRef.current.style.display = "flex";
    }
  }, [location]);

  // define the username
  const { user } = useContext(UserContext);

  return (
    <>
      <header className="header">
        <Link to="/" className="navigation__toggle" onClick={toggleNav}>
          {!isToggle && <i className="fas fa-bars"></i>}
        </Link>

        <div className="header__container">
          <div className="navigation__left">
            <Link to="/" className="navigation__logo">
              <Logo />
            </Link>
          </div>
          <div className="navigation__right" ref={navigationRightRef}>
            <Link to="#" className="search" onClick={toggleSearch}>
              {!isSearching && "Search"}
            </Link>
            <Link to={user === "guest" ? "/users/login" : "/users/profile"}>
              {user === "guest" ? (
                "log in"
              ) : (
                <i className="fas fa-user-cog"></i>
              )}
            </Link>
            <Link to="#" onClick={toggleCart}>
              <i className="fas fa-shopping-cart"></i>
              <span>({qty})</span>
            </Link>
          </div>
        </div>
        {isSearching && (
          <div className="navigation__search">
            <form>
              <span>
                <Link to="#" onClick={toggleSearch}>
                  <i className="fas fa-times"></i>
                </Link>
              </span>
              <input type="text" name="search" placeholder=" WRITE TO SEARCH" />
              <span>
                <Link to="/">
                  <i className="fas fa-search"></i>
                </Link>
              </span>
            </form>
          </div>
        )}
      </header>
      {isToggle && (
        <aside className="navigation__aside">
          <Link to="/" className="navigation__aside-close" onClick={toggleNav}>
            <i className="fas fa-times"></i>
          </Link>
          <ul>
            <li>
              <Link
                onClick={() => {
                  switchToggleState(isToggle);
                }}
                to="/shop/coats"
              >
                Coats
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  switchToggleState(isToggle);
                }}
                to="/shop/jackets"
              >
                Jackets
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  switchToggleState(isToggle);
                }}
                to="/shop/hoodies"
              >
                Hoodies/sweatshirts
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  switchToggleState(isToggle);
                }}
                to="/shop/tracksuits"
              >
                Tracksuits/bottoms
              </Link>
            </li>
          </ul>
        </aside>
      )}
      {cartShow && (
        <aside className="navigation__cart">
          <div className="aside__close">
            <i
              className="fas fa-times"
              onClick={() => {
                setCartShow(false);
              }}
            ></i>
          </div>
          <div className="navigation__cart__container">
            {products.map((product) => {
              return (
                <div
                  className="navigation__cart-group"
                  key={Math.random() + product.id}
                >
                  <span>
                    {product.qty} x {product.size}, {product.name}
                  </span>

                  <img
                    src={`/assets/img/${product.image}-front.jpg`}
                    alt={product.name}
                  />

                  <p>
                    <i
                      onClick={() => {
                        removeFromCart(product);
                      }}
                      className="fas fa-trash-alt"
                    ></i>
                  </p>
                </div>
              );
            })}
            <div className="cart__button">
              <Link
                className="cart__button-link"
                to="/shop/cart"
                onClick={() => {
                  setCartShow(false);
                }}
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default NavBar;
