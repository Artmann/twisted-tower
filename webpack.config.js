const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/client/index.ts',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist', 'public'),
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
