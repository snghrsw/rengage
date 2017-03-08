const webpack = require('webpack');

module.exports = {
  entry: './src/server/',
  output: {
    filename: './bin/server.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'inline-source-map',
  cache: true,
  target: 'node',
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: [
    new webpack.IgnorePlugin(/^vertx$/),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};
