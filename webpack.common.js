const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  entry: {
    autoComplete: './js/autocomplete.js',
    notifications: './js/notifications.js',
    app: "./js/app.js"
    
  },
  output: {
    path: path.resolve(__dirname, 'public/webpack'),
    filename: "[name].js",
    library: "[name]Export"
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  
};