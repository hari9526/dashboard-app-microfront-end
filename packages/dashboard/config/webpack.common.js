const {VueLoaderPlugin} = require('vue-loader'); 

module.exports = {
  entry: './src/index.js', 
  output:{
    filename : '[name].[contenthash].js'
  }, 
  resolve : {
    extensions : ['.js', '.vue']
  }, 
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use : [
          {loader : 'file-loader'}
        ]
      }, 
      {
        test: /\.vue$/, 
        use : ['vue-loader']
      }, 
      {
        test : /\.scss|\.css$/, 
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
      }, 
      //Inside the rules array, we define loader. 
      //Loader tells the webpack how to handle certain files
      //when they are imported into our projects.
      {
        test: /\.m?js$/, //This means that whenever we come
        //across a file that ends with .mjs or .js
        //We will process that file with this particular loader.
        exclude: /node_modules/, //Ie donot use loader on this directory
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins : [new VueLoaderPlugin()], 
};