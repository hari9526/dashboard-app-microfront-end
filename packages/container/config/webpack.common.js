module.exports = {
  module: {
    rules: [
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
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};