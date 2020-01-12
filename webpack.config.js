const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: {
    'main.js': './src/js/main.js',
    'OrderableFileManagerInstance.js': './src/js/OrderableFileManagerInstance.js',
    'demo.js': './src/js/demo.js'
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'public/js'),
    library: "OrderableFileManager",
    libraryExport: 'default',
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public/css']),
    new MinifyPlugin({}, {
      test: /\.min\.js$/,
    }),
  ]
};
