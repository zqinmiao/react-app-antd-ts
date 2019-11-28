const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// https://github.com/Brooooooklyn/ts-import-plugin
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
    alias: {
      // '@': path.resolve(__dirname, '../src'),
      "src": path.resolve(__dirname, '../src'),
      "components": path.resolve(__dirname, '../src/components'),
      "pages": path.resolve(__dirname, '../src/pages'),
      "utils": path.resolve(__dirname, '../src/utils'),
      "services": path.resolve(__dirname, '../src/services'),
      "assets": path.resolve(__dirname, '../src/assets'),
      "types": path.resolve(__dirname, '../src/types')
    }
  },
  module: {
    rules: [
      // https://github.com/TypeStrong/ts-loader
      // {
      //   test: /\.tsx?$/,
      //   use: [
      //     {
      //       loader: 'ts-loader',
      //       options: {
      //         transpileOnly: true
      //       },
      //     }
      //   ]
      // },
      // https://github.com/s-panferov/awesome-typescript-loader
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
          // https://github.com/Brooooooklyn/ts-import-plugin#with-awesome-typescript-loader---350-
          getCustomTransformers: () => ({
            before: [ tsImportPluginFactory({
              libraryDirectory: 'es',
              libraryName: 'antd',
            })]
          }),
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      favicon: path.resolve(__dirname, '../public/'),
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint
    new ForkTsCheckerWebpackPlugin({
      eslint: true
    }),
    // https://github.com/TypeStrong/ts-loader#usage-with-webpack-watch
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ])
  ]
};
