import "./cart.scss";
import CartContext from "../../Context/cart/cartContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const {
    products,
    qty,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useContext(CartContext);

  let [myTotal, setMyTotal] = useState(0);

  // useEffect to calculate total everytime it changes
  useEffect(() => {
    let getTotal = products.reduce((accum, prod) => {
      return accum + prod.qty * prod.price;
    }, 0);
    setMyTotal(getTotal);
  }, [products, qty]);

  // create a function to dispatch increment and decrement
  const handleDecrement = (product) => {
    if (product.qty === 1) {
      return;
    } else {
      decrementQuantity(product.uniqueId);
    }
  };

  const handleIncrement = (product) => {
    incrementQuantity(product.uniqueId);
  };

  //  define a variable for history
  let history = useHistory();

  return (
    <>
      <section className="cart">
        {products.length > 0 ? (
          <div>
            <h1>Shopping cart</h1>
            <h2>{qty} item(s)</h2>

            <div className="cart__container">
              {products.map((product) => {
                return (
                  <div className="cart__product" key={product.uniqueId}>
                    <div className="cart__product-img">
                      <img
                        src={`/assets/img/${product.image}-front.jpg`}
                        alt={product.name}
                      />
                    </div>
                    <div className="cart__product-description">
                      <h3>{product.name}</h3>
                      <p>reference number #{product.uniqueId.toFixed(7)}</p>
                      <p>${product.price}</p>
                      <p> Size : {product.size}</p>
                      <div className="cart__product-quantity">
                        <span
                          onClick={() => {
                            handleDecrement(product);
                          }}
                        >
                          -
                        </span>
                        <input type="text" value={product.qty} disabled />
                        <span
                          onClick={() => {
                            handleIncrement(product);
                          }}
                        >
                          +
                        </span>
                      </div>
                      <p>
                        <i
                          className="fas fa-trash-alt"
                          onClick={() => {
                            removeFromCart(product);
                          }}
                        ></i>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart__total">
              <p>
                Total <span> ${myTotal}</span>
              </p>
              <button
                onClick={() => {
                  history.push("/shop/cart/checkout");
                }}
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        ) : (
          window.location.replace("http://localhost:3000")
        )}
      </section>
    </>
  );
};

export default Cart;
