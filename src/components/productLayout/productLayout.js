import "./productLayout.scss";
import { useParams } from "react-router";
import useCustomFetch from "../../Hooks/useCustomFetch";
import Loader from "../loader/loader";
import Error from "../errors/errors";
import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../../Context/cart/cartContext";

const ProductLayout = () => {
  // get the id from the parameters
  const { id } = useParams();

  //get the product with the custom hook
  const productState = useCustomFetch(
    `http://localhost:5000/api/shop/product/${id}`,
    {
      product: {},
    }
  );

  // use the context to get the add product dispatch from the reducer
  const { addToCart } = useContext(CartContext);
  // useState to manage the size
  const [clothSize, setClothSize] = useState(null);

  const handleSize = (e) => {
    setClothSize(e.target.value);
  };

  // create a ref to show error in case userr don't select size
  const errorRef = useRef();
  //create a function to push product to cart
  const pushTocart = (product) => {
    // check if the size is empty
    if (clothSize === null) {
      errorRef.current.style.display = "block";
    } else {
      errorRef.current.style.display = "none";
      addToCart(product);
    }
  };
  // useEffect to listen to image resizing of product display
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (productRef.current) {
        setPosition(0);
        setPrevious(0);
      }
    });

    return () => {
      window.removeEventListener("resize", () => "");
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
    setPosition(0);
    setPrevious(0);
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
        setPosition((position) => position + 1 + getImageHeight());
      }
    } else if (e.target.src.includes("back")) {
      if (previous === 0) {
        setPrevious(2);
        setPosition((position) => -(position + 2) * getImageHeight());
      } else if (previous === 1) {
        setPrevious(2);
        setPosition((position) => position - 1 - getImageHeight());
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
                  transition: "transform ease-in-out 1s",
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
              <div onChange={handleSize}>
                <label htmlFor="small">
                  <input id="small" type="radio" name="size" value="small" />
                  SM
                </label>
                <label htmlFor="medium">
                  <input id="medium" type="radio" name="size" value="medium" />
                  MD
                </label>
                <label htmlFor="large">
                  <input id="large" type="radio" name="size" value="large" />
                  LG
                </label>
              </div>
              <p>${data.product.price}</p>
              <p ref={errorRef} className="description__error">
                you need to select a size
              </p>
              <div>
                <button
                  onClick={() => {
                    pushTocart({
                      id: data.product.id,
                      price: data.product.price,
                      qty: 1,
                      name: data.product.name,
                      size: clothSize,
                      image: data.product.imageName,
                      uniqueId: Math.random() + data.product.id,
                    });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductLayout;
