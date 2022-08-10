import React from "react";
import ReactDom from "react-dom";
//We are taking the history from createMemoryHistory
//React router dom is also making use of the same library
//internally for getting the history.
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

//Mount function to start up the app
//onNavigate: Used for syncing browser history in container 
//and memory history in marketing app 
const mount = (el, { onNavigate, defaultHistory }) => {
  //We are gonna pass the history from here to the App
  //component
  //If we are having defaultHistory, we'll use that. 
  //This is for enabling browser history when we run 
  //the marketing app in isolation. defaultHistory will be there 
  //only in dev environment. 
  //Thus we can have browser history when we run marketing app in isolation. 
  const history = defaultHistory || createMemoryHistory();
  //Whenever navigation occurs listen method will
  //call the method provided as a parameter. 
  if(onNavigate)
    history.listen(onNavigate); 

  ReactDom.render(<App history={history} />, el);

  //To update memory history when browser history changes. 

  return{
    //There is a location object passed to the onparentnavigate 
    //from the container. 
    //this object contains pathname and we are destructing it 
    //in the parameter. 
    onParentNavigate({pathname : nextPathname}){
      const {pathname} = history.location; 
      if(pathname != nextPathname){
        history.push(nextPathname); 
      }
    }
  }
};

//If we are in development mode and in isolation
//Call the mount function immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory()});
  }
}

//We are running through container
//export mount
export { mount };
