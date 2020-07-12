import React from "react";
import "./css/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
// import {persistor}  from "./Store";
// import { PersistGate } from "redux-persist/integration/react";

import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
import MainPage from "./component/mainPage/MainPage";
import ProductDetail from "./component/ProductDetail/ProductDetail";
import Compare from "./component/comparePage/Compare";
import Cart from "./component/cart/Cart";
import DigitalPage from "./component/digitalPage/DigitalProducts";
import BeautifyHygenPage from "./component/beautify_hygiene/BeautifyHygenProducts";
import Default from "./component/default/Default";
import UserAccount from "./component/userAccount/UserAccount";
import SearchPage from "./component/searchPage/SearchPage";


function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/productDetail/:id" component={ProductDetail} />
            <Route path="/compare/:id" component={Compare} />
            <Route path="/cart" component={Cart} />
            <Route path="/digitalProducts" component={DigitalPage} />
            <Route path="/beautifyHygenProducts" component={BeautifyHygenPage} />
            <Route path="/userAccount" component={UserAccount} />
            <Route path="/search" component={SearchPage} />
            <Route component={Default} />
          </Switch>
          <Footer />
        {/* </PersistGate> */}
      </Router>
    </Provider>
  );
}

export default App;
