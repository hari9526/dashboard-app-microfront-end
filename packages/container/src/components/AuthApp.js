import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({onSignIn}) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      //Setting initial path for the memory history.
      initialPath: history.location.pathname,
      //This is the callback function passed to the marketing app to
      //update navigation details so that memory history and browser history
      //is in sync.
      //onNavigate has a parameter called location
      //which contains all the location info
      //Location is an object and we need the property called pathname from that object
      //For that we are destructuring the object and we are renaming that
      //object as nextPathname
      //that's what happens in
      //{ pathname: nextPathname }

      onNavigate: ({ pathname: nextPathname }) => {
        //Since we are updating the browser history and memory history
        //Whenever they are getting updated, it can get into a inifinite loop
        //To avoid this we need to add a check.
        //Update the history only when it's not the current value.
        //Gives the current pathname in browser history
        const { pathname } = history.location;
        //We are telling the history to navigate to
        //the given path if it's not the current pathname
        if (pathname != nextPathname) history.push(pathname);
      },
      //Authentication. 
      //This is a callback function passed to auth and 
      //it updates whether the user is signed in or not. 
      //Then that is passed to all other apps for authentication .
      onSignIn,

    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
