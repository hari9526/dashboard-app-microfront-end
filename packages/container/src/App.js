import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import MarketingApp from "./components/MarketingApp";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

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
          <MarketingApp />
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
