import NavBar from "./components/navbar/navbar";
import Landing from "./components/Landing/landing";
import { Switch, Route, useLocation } from "react-router-dom";
import Footer from "./components/footer/footer";
import ShopLAyout from "./components/shopLayout/shopLayout";
import useCustomFetch from "./Hooks/useCustomFetch";
import Loader from "./components/loader/loader";
import Error from "./components/errors/errors";
import Login from "./components/users/user";
import ProductLayout from "./components/productLayout/productLayout";
import Cart from "./components/cart/cart";
import CartContext from "./Context/cart/cartContext";
import CheckOutState from "./components/checkout/checkOutState";
import NotFound from "./components/404/404";
import Profile from "./components/users/profile";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useContext, useEffect } from "react";

function App() {
  // define the location for transition
  let location = useLocation();
  // use custom fetch hooks to fetch products data when the app mounts
  const productState = useCustomFetch(
    "http://localhost:5000/api/shop/products",
    {
      products: [],
    }
  );

  // destructure the objects from the productState
  const { loading, isError, data } = productState;

  // filters all the products based on navbar category
  const prodBestSellers = data.products.filter(
    (product) => product.bestSeller === true
  );

  // coats
  const prodCoats = data.products.filter(
    (product) => product.category === "coats".toUpperCase()
  );

  // tracksuits
  const prodTracksuits = data.products.filter((product) => {
    return (
      product.category === "tracksuits".toUpperCase() ||
      product.category === "shorts".toUpperCase()
    );
  });

  //hoodies

  const prodHoodies = data.products.filter((product) => {
    return (
      product.category === "hoodies".toUpperCase() ||
      product.category === "sweatshirts".toUpperCase()
    );
  });

  // jackets
  const prodJackets = data.products.filter(
    (product) => product.category === "jackets".toUpperCase()
  );

  // implement SessionStorage for my cart products
  const { products } = useContext(CartContext);
  // use effect because session is side effect
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  return (
    <>
      <NavBar productArray={data.products} />

      {loading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch>
              <Route exact path="/">
                <Landing data={prodBestSellers} />
              </Route>
              <Route exact path="/shop/cart">
                <Cart />
              </Route>
              <Route exact path="/shop/products/:id">
                <ProductLayout items={data.products} />
              </Route>
              <Route exact path="/shop/coats">
                <ShopLAyout
                  items={prodCoats}
                  text="FEW THINGS DENOTE SOPHISTICATION LIKE OUR COLLECTION OF COATS FOR MEN, WHETHER YOU WEAR A CASUAL, OR TAILORED. THIS IS AN ITEM THAT CAN BRING COHESION TO YOUR LOOK, WHETHER IT BE REFINED OR RELAXED."
                />
              </Route>

              <Route exact path="/shop/jackets">
                <ShopLAyout
                  items={prodJackets}
                  text="WHETHER IT’S A DENIM JACKET OR A LEATHER BIKER JACKET FOR EVERY DAY OR A WINDBREAKER JACKET OR PARKA FOR AN OUTDOORS EVENT, OUR JACKET SELECTION TAPS INTO THE MINDSET OF MODERN DESIGN APPRECIATION WITH NOTES OF PRACTICALITY.
"
                />
              </Route>

              <Route exact path="/shop/hoodies">
                <ShopLAyout
                  items={prodHoodies}
                  text="HOODIES FOR MEN TAKE ON DUAL DUTY. AN ACTIVEWEAR STAPLE, THEY MAKE THE CUT IN A SPORTS AND CASUAL CONTEXT. FROM WHITE TO BLACK, OVERSIZED TO SHORT-SLEEVED, THE CASUAL CATEGORY COMPLEMENT ALL OFF-DUTY OUTFITS"
                />
              </Route>

              <Route exact path="/shop/tracksuits">
                <ShopLAyout
                  text="FEW THINGS DENOTE SOPHISTICATION LIKE OUR COLLECTION OF TRACKSUITS FOR MEN, WHETHER YOU WEAR A CASUAL, OR TAILORED. THIS IS AN ITEM THAT CAN BRING COHESION TO YOUR LOOK, WHETHER IT BE REFINED OR RELAXED"
                  items={prodTracksuits}
                />
              </Route>
              <Route exact path="/shop/cart/checkout">
                <CheckOutState />
              </Route>

              <Route exact path="/users/login">
                <Login />
              </Route>
              <Route exact path="/users/profile">
                <Profile />
              </Route>

              <Route path="/">
                <NotFound />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}

      <Footer />
    </>
  );
}

export default App;
