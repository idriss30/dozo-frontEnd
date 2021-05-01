import "./slideShow.scss";
import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

const SlideShow = ({ items }) => {
  // use ref to get an hold of the cliendWith
  const sliderRef = useRef(null);
  // use state to define current image
  const [currentImage, setCurrentImage] = useState(0);
  // use state to define how to animate;
  const [translatePosition, setTranslatePosition] = useState(0);

  // create a function to get the width of the slider container
  const getContainerSize = () => {
    return sliderRef.current.offsetWidth;
  };
  // useEffect to stop slider from breaking while resizing
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (sliderRef.current) {
        setCurrentImage(0);
        setTranslatePosition(0);
      }
    });

    return () => {
      window.removeEventListener("resize", () => console.log("cleared"));
    };
  });

  const moveForward = (e) => {
    e.preventDefault();
    if (currentImage === items.length - 1) {
      return;
    }
    setCurrentImage((currentImage) => currentImage + 1);

    setTranslatePosition(
      (translatePosition) => translatePosition - getContainerSize()
    );
  };

  const moveBackward = (e) => {
    e.preventDefault();
    if (currentImage === 0) {
      return;
    } else {
      setCurrentImage((currentImage) => currentImage - 1);
      setTranslatePosition(
        (translatePosition) => translatePosition + getContainerSize()
      );
    }
  };

  return (
    <>
      <div className="react__slider">
        <div className="react__slider-leftArrow">
          <a href="/" onClick={moveBackward}>
            <i className="fas fa-chevron-left"></i>
          </a>
        </div>

        <div className="react__slider__image">
          <div
            className="react__slider__image-wrapper"
            style={{
              transform: `translateX(${translatePosition}px)`,
              transition: "transform ease-in-out 1s",
            }}
          >
            {
              // display all the images in the slideshow
              items.map((item) => {
                return (
                  <Link
                    key={item.id}
                    ref={sliderRef}
                    className="slide"
                    to={`/shop/products/${item.id}`}
                  >
                    <img
                      src={`/assets/img/${item.imageName}-front.jpg`}
                      alt={item.name}
                    />
                  </Link>
                );
              })
            }
          </div>
        </div>

        <div className="react__slider-rightArrow">
          <a href="/" onClick={moveForward}>
            <i className="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </>
  );
};
export default SlideShow;
