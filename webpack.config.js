const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    'main': './lib/main.js',
    'OrderableFileManagerInstance': './lib/OrderableFileManagerInstance.js',
    'demo': './lib/demo.js',
  },
  //devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    library: "OrderableFileManager",
    libraryExport: 'default',
    libraryTarget: "umd"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    },{
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader','less-loader']
      })
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
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
