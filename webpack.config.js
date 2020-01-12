const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    'main': './src/js/main.js',
    'OrderableFileManagerInstance': './src/js/OrderableFileManagerInstance.js',
    'demo': './src/js/demo.js',
    'styles': './src/js/styles.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
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
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  },
  resolve: {
      extensions: ['.js', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new MinifyPlugin({}, {
      test: /\.min\.js$/,
    }),
  ]
};
