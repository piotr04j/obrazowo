const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  return  {
    entry: { app: './frontend/app.js'},
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: '[name]-[hash].js',
      chunkFilename: '[id]-[chunkhash].js'
    },
    devtool: devMode && 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
        chunkFilename: '[id]-[chunkhash].css'
      }),
      new WebpackAssetsManifest({
        writeToDisk: true,
        entrypoints: true,
        output: 'entrypoints.json',
        publicPath : 'dist/'
      })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        { test: /\.(js|tsx?)$/, loader: 'ts-loader' },
        {
          test: /\.s?css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ],
        },
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'public/dist'),
      compress: true,
      port: 8003,
      hot: true,
      writeToDisk: true
    }
  }
}

