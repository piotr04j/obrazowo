const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  const devServerPort = 8003
  const assetBasePath = 'public/'
  const assetChunkPath = 'public/dist'
  const isDevServer = env.WEBPACK_SERVE
  const webpackAssetsManifest = new WebpackAssetsManifest({
    writeToDisk: true,
    entrypoints: true,
    output: 'entrypoints.json',
    publicPath :  isDevServer ? 'http://localhost:' + devServerPort + '/' + assetChunkPath + '/' : 'dist/'
  })
  webpackAssetsManifest.hooks.transform.tap('Adjusted nesting for webpack encore', function(assets, manifest) {
    const adjustedAssets = { entrypoints: { app: null }}
    adjustedAssets.entrypoints.app = assets.entrypoints.app.assets

    return adjustedAssets
  })

  return  {
    mode: devMode ? 'development' : 'production',
    entry: { app: './frontend/app.js'},
    output: {
      path: path.resolve(__dirname, assetChunkPath),
      filename: '[name].[contenthash].js',
      chunkFilename: '[id].[contenthash].js'
    },
    devtool: devMode ? 'cheap-source-map' : false,
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css'
      }),
      webpackAssetsManifest
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.(js|tsx?)$/,
          include: [
            path.resolve(__dirname, 'frontend'),
          ],
          exclude: /node_modules/,
          loader: 'ts-loader'
        },
        {
          test: /\.s?css$/i,
          exclude: /node_modules/,
          include: [
            path.resolve(__dirname, 'frontend'),
          ],
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
      contentBase: path.join(__dirname, assetBasePath),
      compress: true,
      port: devServerPort,
      host: '0.0.0.0',
      disableHostCheck: true,
      hot: true,
      publicPath: 'http://localhost:' + devServerPort + '/' + assetChunkPath + '/'
    }
  }
}
