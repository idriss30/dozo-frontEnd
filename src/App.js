import NavBar from "./components/navbar/navbar";
import Landing from "./components/Landing/landing";
import { Switch, Route, useLocation } from "react-router-dom";
import Footer from "./components/footer/footer";
import Coats from "./components/coats/coats";
import Jackets from "./components/jackets/jackets";
import Hoodies from "./components/hoodies/hoodies";
import Bottoms from "./components/bottoms/bottoms";
import Tracksuits from "./components/tracksuits/tracksuits";
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
              <Coats />
            </Route>
            <Route exact path="/shop/bottoms">
              <Bottoms />
            </Route>
            <Route exact path="/shop/jackets">
              <Jackets />
            </Route>
            <Route exact path="/shop/hoodies">
              <Hoodies />
            </Route>
            <Route exact path="/shop/coats">
              <Coats />
            </Route>
            <Route exact path="/shop/tracksuits">
              <Tracksuits />
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
