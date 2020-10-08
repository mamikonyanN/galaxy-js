const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/',
  mode: 'development',
  output: {
    filename: '[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      { test: /\.(png|jpe?g|gif|svg)$/i, use: 'file-loader' },
      { test: /\.ts?$/, loader: 'ts-loader' }
    ]
  },
  resolve: { extensions: ['.webpack.js', '.ts', '.js'] }
}