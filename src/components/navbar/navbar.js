import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { CSSTransition } from "react-transition-group";
import "./navbar.scss";

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
  const toggleSearch = (e) => {
    e.preventDefault();
    setSearching(!isSearching);
  };
  return (
    <>
      <header className="header">
        <a href="/" className="navigation__toggle" onClick={toggleNav}>
          {!isToggle && <i className="fas fa-bars"></i>}
        </a>

        <div className="header__container">
          <div className="navigation__left">
            <a href="/" className="navigation__logo">
              <Logo />
            </a>
          </div>
          <div className="navigation__right">
            <a href="/" className="search" onClick={toggleSearch}>
              {!isSearching && "Search"}
            </a>
            <a href="/">Log in</a>
            <a href="/">
              Cart<span>({0})</span>
            </a>
          </div>
        </div>
        {isSearching && (
          <div className="navigation__search">
            <form>
              <span>
                <a href="/" onClick={toggleSearch}>
                  <i className="fas fa-times"></i>
                </a>
              </span>
              <input type="text" name="search" placeholder=" WRITE TO SEARCH" />
              <span>
                <a href="#">
                  <i className="fas fa-search"></i>
                </a>
              </span>
            </form>
          </div>
        )}
      </header>

      {isToggle && (
        <aside className="navigation__aside">
          <a href="#" className="navigation__aside-close" onClick={toggleNav}>
            <i className="fas fa-times"></i>
          </a>
          <ul>
            <li>
              <a href="#">Coats</a>
            </li>
            <li>
              <a href="#">Jackets</a>
            </li>
            <li>
              <a href="#">Hoodies</a>
            </li>
            <li>
              <a href="#">Tracksuits</a>
            </li>
            <li>
              <a href="#">Bottoms</a>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
};

export default NavBar;
