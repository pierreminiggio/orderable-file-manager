import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const devMode = 'development'
const isDevelopment = process.env.NODE_ENV === devMode
const mode = isDevelopment ? devMode : 'production'

export default {
  entry: {
    'main': './src/js/main.js',
    'OrderableFileManagerInstance': './src/js/OrderableFileManagerInstance.js',
    'demo': './src/js/demo.js',
    'styles': './src/js/styles.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'public'),
    library: "OrderableFileManager",
    libraryExport: 'default',
    libraryTarget: "umd"
  },
  mode,
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
        use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }]
      }
    ]
  },
  resolve: {
      extensions: ['.js', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['public']}),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new MinifyPlugin({}, {
      test: /\.min\.js$/,
    }),
  ]
};
