import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "animate.css/animate.min.css";
import App from "./App";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
