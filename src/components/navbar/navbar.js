import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";
const NavBar = () => {
  // toggle the navbar
  const [isToggle, setToggle] = useState(false);

  // toggle the search bar
  const [isSearching, setSearching] = useState(false);

  // create a function to handle the navbar state
  const toggleNav = (e) => {
    e.preventDefault();
    if (isToggle) {
      document.body.style.overflow = "initial";
      setToggle(false);
    } else {
      document.body.style.overflow = "hidden";
      setToggle(true);
    }
  };

  // create a function to toggle search state
  const toggleSearch = () => {
    setSearching(!isSearching);
  };
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
          <div className="navigation__right">
            <Link to="/search" className="search" onClick={toggleSearch}>
              {!isSearching && "Search"}
            </Link>
            <Link to="/users/login">Log in</Link>
            <Link to="/cart">
              Cart<span>({0})</span>
            </Link>
          </div>
        </div>
        {isSearching && (
          <div className="navigation__search">
            <form>
              <span>
                <Link to="/" onClick={toggleSearch}>
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
              <Link to="/shop/coats">Coats</Link>
            </li>
            <li>
              <Link to="/shop/jackets">Jackets</Link>
            </li>
            <li>
              <Link to="/shop/hoodies">Hoodies</Link>
            </li>
            <li>
              <Link to="/shop/tracksuits">Tracksuits</Link>
            </li>
            <li>
              <Link to="/shop/bottoms">Bottoms</Link>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
};

export default NavBar;
