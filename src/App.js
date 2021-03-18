import NavBar from "./components/navbar/navbar";
import Landing from "./components/Landing/landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/footer/footer";
import Coats from "./components/coats/coats";
function App() {
  return (
    <>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/shop/coats">
            <Coats />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
