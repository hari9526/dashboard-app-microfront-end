import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      //This is the callback function passed to the marketing app to
      //update navigation details so that memory history and browser history
      //is in sync.
      //onNavigate has a parameter called location
      //which contains all the location info
      onNavigate: (location) => {
        //Since we are updating the browser history and memory history based
        //Whenever they are getting updated, it can get into a inifinite loop
        //To avoid this we need to add a check.
        //Update the history only when it's not the current value.
        //Gives the current pathname in browser history
        const { pathname } = history.location;
        //Gives the current pathname form the memory history
        const nextPathname = location.location.pathname;
        //We are telling the history to navigate to
        //the given path if it's not the current pathname
        if (pathname != nextPathname) history.push(pathname);
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
