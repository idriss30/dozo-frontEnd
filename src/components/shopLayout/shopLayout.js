import "./shopLayout.scss";
import { Link } from "react-router-dom";
import useCustomFetch from "../../Hooks/useCustomFetch";
import Loader from "../../components/loader/loader";
import Error from "../../components/errors/errors";

const ShopLayout = ({ url, text }) => {
  // use the custom hook fetch
  const state = useCustomFetch(url, {
    products: [],
  });
  // desctructure the objects
  const { loading, isError, data } = state;
  // get the first product in the array
  const firstProduct = { ...data.products[0] };

  return (
    <>
      {loading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <section className="shop">
          <div className="shop__container">
            <div className="shop__container-display">
              <Link to="/">
                <img src={`/assets/img/${firstProduct.imageName}-front.jpg`} />
              </Link>
              <h1> {firstProduct.category} FOR MEN </h1>
              <p>{text}</p>
            </div>
            <div className="shop__container-all">
              {data.products.map((product) => {
                return (
                  <div className="shop__container-all-display" key={product.id}>
                    <Link to={`/shop/product/${product.id}`}>
                      <img src={`/assets/img/${product.imageName}-front.jpg`} />
                    </Link>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ShopLayout;
