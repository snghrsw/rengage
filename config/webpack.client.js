const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: './src/client.ts',
    vendor: ['react', 'redux', 'react-dom', 'universal-router', 'firebase'],
  },
  output: {
    filename: './public/[name].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'web',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor'),
  ],
  cache: true,
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
}
