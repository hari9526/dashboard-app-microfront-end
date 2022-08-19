//Suspense is a react component and
//lazy is a react function.
//They are used for lazy loading to avoid
//loading up the components not required.
import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Progress from "./components/Progress";

//We are gonna do lazy loading of the following
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

//Lazy loading.
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

//Instead of creating classnames with jss, like jss1, jss2,
//we are generating it as ma1, ma2 for the production site
//so that we can avoid the name collision.
//This won't have an impact on that mfes.
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory(); 

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(()=>{
    if(isSignedIn)
      history.push('/dashboard'); 
  }, [isSignedIn] ); 

  return (
    // Browser router is use Browser history where
    // the url in the address is utilizied.
    // In microfront end architecture we use browser history only
    // inside the container app.
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => {
              setIsSignedIn(false);
            }}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard" >
                  {!isSignedIn && <Redirect to="/" />}
                  <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
