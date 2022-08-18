import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

//Instead of creating classnames with jss, like jss1, jss2,
//we are generating it as ma1, ma2 for the production site
//so that we can avoid the name collision.
//This won't have an impact on that mfes.
const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <SignIn onSignIn={onSignIn} />
            </Route>
            <Route path="/auth/signup">
              <SignUp onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
