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
  devServer: {
    port: 8081,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared : packageJson.dependencies, 
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