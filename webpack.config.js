const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');
const banner =`vue-sanitize v${require("./package.json").version}
https://github.com/daichirata/vue-sanitize
Released under the MIT License.`;

module.exports = {
  entry: './src/index.js',
  output: {
    path: dist,
    filename: 'vue-sanitize.js',
	library: 'VueSanitize',
	libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin([dist]),
    new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    new webpack.BannerPlugin(banner),
  ]
};
