import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "animate.css/animate.min.css";
import App from "./App";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import { BrowserRouter } from "react-router-dom";
import CartState from "./Context/cart/cartState";
import UserState from "./Context/user/userState";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <ScrollToTop />
      <CartState>
        <UserState>
          <App />
        </UserState>
      </CartState>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
