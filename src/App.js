import React from 'react';
import { Switch, Route } from 'react-router-dom'
import IndexPage from './components/IndexPage'
import ProductViewPage from './components/ProductViewPage'
import LogInPage from './components/LogInPage'
import RegisterPage from './components/RegisterPage'
import CategoryPage from "./components/CategoryPage";
import SubCategoryPage from "./components/SubCategoryPage";
import CartPage from "./components/CartPage";
import AboutPage from "./components/AboutPage";
import ContactUsPage from "./components/ContactUsPage";
import SearchPage from "./components/SearchPage";
import PageNotFound from "./components/PageNotFound";
import ProductEnterPage from "./components/ProductEnterPage";

//to serve backend images proxy server is set in package.json

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={IndexPage}></Route>
        <Route exact path="/login_react" component={LogInPage}></Route>
        <Route exact path="/register_react" component={RegisterPage}></Route>
        <Route exact path="/product_react/:id" component={ProductViewPage}></Route>
        <Route exact path="/category_react/:category_name" component={CategoryPage}></Route>
        <Route exact path="/sub_category_react/:category_name" component={SubCategoryPage}></Route>
        <Route exact path="/cart_react" component={CartPage}></Route>
        <Route exact path="/about_react" component={AboutPage}></Route>
        <Route exact path="/contactus_react" component={ContactUsPage}></Route>
        <Route exact path="/search_react" component={SearchPage}></Route>
        <Route exact path="/product_enter" component={ProductEnterPage}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </>
  );
}

export default App;
