const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  return  {
    entry: { main: './frontend/app.js'},
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js'
    },
    devtool: devMode && "inline-source-map",
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[chunkhash].css',
        chunkFilename: devMode ? '[name].css' : '[name].[chunkhash].css'
      }),
      new WebpackAssetsManifest({
        writeToDisk: true,
        entrypoints: true,
        output: 'entrypoints.json',
        publicPath : 'dist/'
      })
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.(js|tsx?)$/, loader: "ts-loader" },
        {
          test: /\.s?css$/i,
          use: [
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
