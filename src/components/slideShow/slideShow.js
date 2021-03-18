import "./slideShow.scss";
import burgundy from "../../assets/img/burgundy.jpg";
import coat from "../../assets/img/beigeCoat-front.jpg";
import jacket from "../../assets/img/grayCoat-front.jpg";
import { useRef, useState } from "react";

const SlideShow = () => {
  const items = [burgundy, coat, jacket];

  // use ref to get an hold of the cliendWith
  const sliderRef = useRef(null);
  // use state to define current image
  const [currentImage, setCurrentImage] = useState(0);
  // use state to define how to animate;
  const [translatePosition, setTranslatePosition] = useState(0);

  const moveForward = (e) => {
    e.preventDefault();
    if (currentImage === items.length - 1) {
      return;
    }
    setCurrentImage((currentImage) => currentImage + 1);
    setTranslatePosition(
      (translatePosition) => translatePosition - sliderRef.current.offsetWidth
    );
  };

  const moveBackward = (e) => {
    e.preventDefault();
    if (currentImage === 0) {
      return;
    } else {
      setCurrentImage((currentImage) => currentImage - 1);
      setTranslatePosition(
        (translatePosition) => translatePosition + sliderRef.current.offsetWidth
      );
    }
  };

  return (
    <>
      <div className="react__slider">
        <div className="react__slider-leftArrow">
          <a href="#" onClick={moveBackward}>
            <i className="fas fa-chevron-left"></i>
          </a>
        </div>

        <div className="react__slider__image">
          <div
            className="react__slider__image-wrapper"
            style={{
              transform: `translateX(${translatePosition}px)`,
              transition: "transform ease-out 0.45s",
            }}
          >
            {items.map((item, index) => {
              return (
                <a key={index} href="#" className="slide" ref={sliderRef}>
                  <img src={item} alt="photo" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="react__slider-rightArrow">
          <a href="#" onClick={moveForward}>
            <i className="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </>
  );
};
export default SlideShow;
