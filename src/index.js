import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "animate.css/animate.min.css";
import App from "./App";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import { BrowserRouter } from "react-router-dom";
import CartState from "./Context/cart/cartState";
ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <CartState>
      <App />
    </CartState>
  </BrowserRouter>,
  document.getElementById("root")
);
