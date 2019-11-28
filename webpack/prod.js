const merge = require('webpack-merge');
const webpack = require('webpack');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const common = require("./common.js");


module.exports = merge(common,{
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    publicPath: "/"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // https://webpack.docschina.org/plugins/mini-css-extract-plugin/#minimizing-for-production
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
    ]
  },
  optimization: {
    // https://webpack.docschina.org/configuration/optimization/#optimization-minimizer
    minimizer: [
      new TerserJSPlugin({
        sourceMap: true
      }),
      // https://webpack.docschina.org/plugins/mini-css-extract-plugin/#minimizing-for-production
      new OptimizeCSSAssetsPlugin()
    ],
    // https://webpack.docschina.org/guides/caching/#%E6%8F%90%E5%8F%96%E5%BC%95%E5%AF%BC%E6%A8%A1%E6%9D%BF-extracting-boilerplate-
    runtimeChunk: 'single',
    // https://webpack.docschina.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      automaticNameDelimiter: "-",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins:[
    // https://webpack.docschina.org/plugins/mini-css-extract-plugin/#minimizing-for-production
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    // https://webpack.docschina.org/guides/caching/#%E6%A8%A1%E5%9D%97%E6%A0%87%E8%AF%86%E7%AC%A6-module-identifier-
    // https://webpack.docschina.org/plugins/hashed-module-ids-plugin
    new webpack.HashedModuleIdsPlugin()
  ]
});
