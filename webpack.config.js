const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  entry: {
    autoComplete: "./js/autocomplete.js",
    // notifcations: './js/notifications.js',
    app: "./js/app.js"
    // socketClient: './js/socketClient.js'
  },
  output: {
    path: path.resolve(__dirname, "public/webpack"),
    filename: "[name].js",
    library: "[name]Export"
  }
};
