//Suspense is a react component and
//lazy is a react function.
//They are used for lazy loading to avoid
//loading up the components not required.
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";

//We are gonna do lazy loading of the following
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

//Lazy loading.
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

//Instead of creating classnames with jss, like jss1, jss2,
//we are generating it as ma1, ma2 for the production site
//so that we can avoid the name collision.
//This won't have an impact on that mfes.
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  return (
    // Browser router is use Browser history where
    // the url in the address is utilizied.
    // In microfront end architecture we use browser history only
    // inside the container app.
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/auth" component={AuthLazy} />
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
