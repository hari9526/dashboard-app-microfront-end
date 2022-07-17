const {merge} = require('webpack-merge'); 
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin'); 

const commonConfig = require('./webpack.common'); 
const packageJson = require('../package.json'); 
//This will be specified in the CI/CD pipeline 
const domain = process.env.PRODUCTION_DOMAIN; 

const prodConfig = {
  mode: "production", //This will minify and optimize the build for production
  output: {
    filename: "[name].[contenthash].js",
    publicPath : '/container/latest/', 
  },
  plugins: [
    new ModuleFederationPlugin({
        name : 'container', 
        remotes : {
            marketing: `marketing@${domain}/marketing/remoteEntry.js`, 
        }, 
        shared : packageJson.dependencies, 
    })
  ],
};

module.exports = merge(commonConfig, prodConfig); 