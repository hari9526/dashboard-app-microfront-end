import {createApp} from 'vue'; 
import Dashboard from './components/Dashboard.vue'; 


//Mount function to start up the app

const mount = (el) => {
  const app = createApp(Dashboard); 
  //this mount is a function in Vue. 
  app.mount(el); 
};

//If we are in development mode and in isolation
//Call the mount function immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

//We are running through container
//export mount
export { mount };