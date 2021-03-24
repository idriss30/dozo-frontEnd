import "./cart.scss";
import burgundy from "../../assets/img/burgundy.jpg";

const Cart = () => {
  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__product">
          <div className="cart__product-description">
            <p>
              <span>L </span>Denim Jacket
            </p>
            <p>
              <span>2</span> X $<span>69</span>
            </p>
          </div>
          <div className="cart__product-image">
            <img src={burgundy} alt="personal_image" />
          </div>
        </div>
        <div className="cart__product">
          <div className="cart__product-description">
            <p>
              <span>L </span>Denim Jacket
            </p>
            <p>
              <span>2</span> X $<span>69</span>
            </p>
          </div>
          <div className="cart__product-image">
            <img src={burgundy} alt="personal_image" />
          </div>
        </div>
      </div>
      <button>Go to Cart</button>
    </div>
  );
};

export default Cart;
