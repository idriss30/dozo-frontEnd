import NavBar from "./components/navbar/navbar";
import burgundy from "./assets/img/burgundy.jpg";
import coat from "./assets/img/beigeCoat-front.jpg";
import jacket from "./assets/img/grayCoat-front.jpg";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  const items = [burgundy, coat, jacket];

  // use state to define the current
  const [currentImage, setCurrentImage] = useState(0);

  // create a function to handle forward
  const moveForward = () => {
    if (currentImage === items.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((currentImage) => currentImage + 1);
    }
  };

  // create a function to handle backword;
  const moveBackward = () => {
    if (currentImage === 0) {
      setCurrentImage(items.length - 1);
    } else {
      setCurrentImage((currentImage) => currentImage - 1);
    }
  };
  return (
    <>
      <NavBar />
      <section className="landing">
        <div className="landing__container">
          <div className="landing__controls-left">
            <a href="#" onClick={moveBackward}>
              <i className="fas fa-chevron-left"></i>
            </a>
          </div>

          <div className="landing__image">
            <a href="#">
              <img src={items[currentImage]} />
            </a>
          </div>

          <div className="landing__controls-right">
            <a href="#" onClick={moveForward}>
              <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>
      </section>
      <section className="best__seller">
        <h1> Best sellers</h1>
        <div className="best__seller-container">
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
          <div className="best__seller-container-display">
            <img src={burgundy} />
            <p>New</p>
            <p>beautiful coat</p>
            <p>$100</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
