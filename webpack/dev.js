const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require("./common.js");

module.exports = merge(common,{
  mode: 'development',
  output: {
    filename: 'main.js',
    chunkFilename: '[name].chunk.js',
    publicPath: "/"
  },
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: './dist',
    publicPath: "/",
    host: '0.0.0.0',
    port: 8084,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader:"less-loader",
            options:{
              javascriptEnabled: true
            }
          }
        ]
      },
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
});
