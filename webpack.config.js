const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
  entry: './src/react/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', {
          loader: 'eslint-loader',
          options: {
            emitWarning: true
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/react/index.html',
      filename: './index.html'
    }),
    new CopyPlugin([
      { from: './src/react/css', to: './css' },
      { from: './src/react/videos', to: './videos' },
      { from: './src/react/socketio', to: './socketio' }
    ]),
    new ErrorOverlayPlugin()
  ],
  devtool: 'cheap-module-source-map'
}
