//Merge is used for merging webpack files 
//In this case, to merge commmon and dev files 
const {merge } = require('webpack-merge'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  output: {
    //We are specifying the public path here
    //because we need to access http://localhost:8082/main.js
    //in index.html. If this is not provided, then
    //http://localhost:8082/auth/singin/main.js will be called
    //in signup page instead of http://localhost:8082/main.js
    //To avoid this we need to use this. 
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    port: 8082,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

//Merging common and dev config 
//Dev config is having high priority here. 
//If there are common config in both the files, then 
//dev will have priority since it's coming second 
module.exports = merge(commonConfig, devConfig); 