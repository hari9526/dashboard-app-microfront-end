//Merge is used for merging webpack files 
//In this case, to merge commmon and dev files 
const {merge } = require('webpack-merge'); 
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin'); 
//Common config 
const commonConfig = require('./webpack.common'); 

//To import packages used in this project so that we don't have specify 
//each of them manually. 
//packageJson is a JS object of package.json
//Also note that when we specify all the packages in the shared section, 
//it'll greatly reduce the number of packages loaded and thus improve the 
//performance. 
const packageJson = require('../package.json'); 

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container", //Naming a container is not really required.
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      //Note: To avoid packages loading multiple times we have to
      //specify the packages like this.
      // Eg: shared: ["react", "react-dom"],
      //But this can be tedious when we work with multiple packages.
      //To avoid this, we can import the package names from package.json and
      //specify them. So, it's easier this way.
      //packageJson.dependencies will contain all the dependencies of this project.
      //which is exactly what we need.
      shared: packageJson.dependencies,
    }),
  ],
};

//Merging common and dev config 
//Dev config is having high priority here. 
//If there are common config in both the files, then 
//dev will have priority since it's coming second 
module.exports = merge(commonConfig, devConfig); 