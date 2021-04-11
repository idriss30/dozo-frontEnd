import "./productLayout.scss";
import { useParams } from "react-router";
import useCustomFetch from "../../Hooks/useCustomFetch";
import Loader from "../loader/loader";
import Error from "../errors/errors";
import { useEffect, useRef, useState } from "react";

const ProductLayout = () => {
  // come back to this section  later
  const { id } = useParams();
  const productState = useCustomFetch(
    `http://localhost:5000/api/shop/product/${id}`,
    {
      product: {},
    }
  );

  // useEffect to listen to image resizing
  useEffect(() => {
    let mount = false;
    window.addEventListener("resize", () => {
      if (!mount) {
        resetImage();
      }
    });

    return () => {
      window.removeEventListener("resize", () => (mount = true));
    };
  });
  // extract the state
  const { loading, isError, data } = productState;
  // create the images Array
  const productImages = [
    `/assets/img/${data.product.imageName}-front.jpg`,
    `/assets/img/${data.product.imageName}-side.jpg`,
    `/assets/img/${data.product.imageName}-back.jpg`,
  ];

  // check the previous index
  const [previous, setPrevious] = useState(0);
  const [position, setPosition] = useState(0);
  // define the ref to get the size of the container
  const productRef = useRef();

  // get imageHeight
  const getImageHeight = () => {
    return productRef.current.offsetHeight + 1.5;
  };

  const resetImage = () => {
    if (productRef) {
      setPosition(0);
      setPrevious(0);
    }
  };

  const handleClick = (e) => {
    // come back to refactor it later
    if (e.target.src.includes("front")) {
      resetImage();
    } else if (e.target.src.includes("side")) {
      if (previous === 0) {
        setPrevious(1);
        setPosition((position) => position + 1 - getImageHeight());
      } else if (previous === 1) {
        return;
      } else {
        setPrevious(1);
        setPosition((position) => position - 1 + getImageHeight());
      }
    } else if (e.target.src.includes("back")) {
      if (previous === 0) {
        setPrevious(2);
        setPosition((position) => -(position + 2) * getImageHeight());
      } else if (previous === 1) {
        setPrevious(2);
        setPosition((position) => position - getImageHeight());
      } else {
        return;
      }
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <section className="product">
          <div className="product__container">
            <div className="product__container__presentation">
              <div
                className="product__container__presentation-wrapper"
                style={{
                  transform: `translateY(${position}px)`,
                  transition: "transform ease-out 0.45s",
                }}
              >
                {productImages.map((imageSrc) => {
                  return (
                    <div
                      key={Math.random()}
                      className="imageDiv"
                      ref={productRef}
                      style={{
                        backgroundImage: `url(${imageSrc})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="product__container__controls">
              {productImages.map((image) => {
                return (
                  <div key={Math.random()}>
                    <img
                      src={image}
                      alt={data.product.name}
                      onClick={handleClick}
                    />
                  </div>
                );
              })}
            </div>
            <div className="product__container__description">
              <h2>{data.product.name}</h2>
              <h3>{data.product.description}</h3>
              <p>Select Your Size</p>
              <label htmlFor="small">
                <input id="small" type="radio" name="size" value="small" />
                SM
              </label>
              <label htmlFor="medium">
                <input
                  id="medium"
                  type="radio"
                  name="size"
                  value="medium"
                  defaultChecked
                />
                MD
              </label>
              <label htmlFor="large">
                <input id="large" type="radio" name="size" />
                LG
              </label>
              <p>${data.product.price}</p>
              <div>
                <button>Add to Cart</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductLayout;
