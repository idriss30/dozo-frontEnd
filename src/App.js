import NavBar from "./components/navbar/navbar";
import Landing from "./components/Landing/landing";
import { Switch, Route, useLocation } from "react-router-dom";
import Footer from "./components/footer/footer";
import ShopLAyout from "./components/shopLayout/shopLayout";

import Login from "./components/users/user";

import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  // define the location for transition
  let location = useLocation();

  return (
    <>
      <NavBar />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <Switch>
            <Route exact path="/shop/coats">
              <ShopLAyout
                url="http://localhost:5000/api/shop/coats"
                text="FEW THINGS DENOTE SOPHISTICATION LIKE OUR COLLECTION OF COATS FOR MEN, WHETHER YOU WEAR A CASUAL, OR TAILORED. THIS IS AN ITEM THAT CAN BRING COHESION TO YOUR LOOK, WHETHER IT BE REFINED OR RELAXED."
              />
            </Route>

            <Route exact path="/shop/jackets">
              <ShopLAyout
                url="http://localhost:5000/api/shop/jackets"
                text="WHETHER IT’S A DENIM JACKET OR A LEATHER BIKER JACKET FOR EVERY DAY OR A WINDBREAKER JACKET OR PARKA FOR AN OUTDOORS EVENT, OUR JACKET SELECTION TAPS INTO THE MINDSET OF MODERN DESIGN APPRECIATION WITH NOTES OF PRACTICALITY.
"
              />
            </Route>

            <Route exact path="/shop/hoodies">
              <ShopLAyout
                url="http://localhost:5000/api/shop/hoodies"
                text="HOODIES FOR MEN TAKE ON DUAL DUTY. AN ACTIVEWEAR STAPLE, THEY MAKE THE CUT IN A SPORTS AND CASUAL CONTEXT. FROM WHITE TO BLACK, OVERSIZED TO SHORT-SLEEVED, THE CASUAL CATEGORY COMPLEMENT ALL OFF-DUTY OUTFITS"
              />
            </Route>

            <Route exact path="/shop/tracksuits">
              <ShopLAyout
                text="FEW THINGS DENOTE SOPHISTICATION LIKE OUR COLLECTION OF TRACKSUITS FOR MEN, WHETHER YOU WEAR A CASUAL, OR TAILORED. THIS IS AN ITEM THAT CAN BRING COHESION TO YOUR LOOK, WHETHER IT BE REFINED OR RELAXED"
                url="http://localhost:5000/api/shop/tracksuits"
              />
            </Route>
            <Route exaxt path="/users/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>

      <Footer />
    </>
  );
}

export default App;
