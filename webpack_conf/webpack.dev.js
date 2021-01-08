const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  entry: {
    main: './src/index.js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/, // regex to see which files to run babel on
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin({
        overlay: {
          sockIntegration: 'whm',
        },
    }),
    new HtmlWebpackPlugin({
      // name this file main, so that it does not get automatically requested as a static file
      filename:'./main.html',
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
    }),

  ].filter(Boolean),
});
