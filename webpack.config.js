const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/js/main.js',
    'OrderableFileManagerInstance': './src/js/OrderableFileManagerInstance.js',
    'demo': './src/js/demo.js',
    'OrderableFileManager': './src/sass/main.scss'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js'),
    library: "OrderableFileManager",
    libraryExport: 'default',
    libraryTarget: "umd"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader','sass-loader']
      })
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['public/css']),
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath('[name].css');
      }
    }),
    new MinifyPlugin({}, {
      test: /\.min\.js$/,
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } }
    })
  ]
};
