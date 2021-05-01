import "./shopLayout.scss";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

const ShopLayout = ({ items, text }) => {
  let firstProduct = { ...items[0] };

  return (
    <section className="shop">
      <div className="shop__container">
        <div className="shop__container-display">
          <Link to={`/shop/products/${firstProduct.id}`}>
            <img
              src={`/assets/img/${firstProduct.imageName}-front.jpg`}
              alt={firstProduct.name}
            />
          </Link>
          <h1> {firstProduct.category} FOR MEN </h1>
          <p>{text}</p>
        </div>
        <ScrollAnimation
          animateIn="animate__animated animate__fadeIn"
          animateOut="animate__animated animate__fadeOut"
          duration={1}
        >
          <div className="shop__container-all">
            {items.map((product) => {
              return (
                <div className="shop__container-all-display" key={product.id}>
                  <Link to={`/shop/products/${product.id}`}>
                    <img
                      src={`/assets/img/${product.imageName}-front.jpg`}
                      alt={product.name}
                    />
                  </Link>
                  <p>{product.name}</p>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </div>
              );
            })}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ShopLayout;
