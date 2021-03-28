const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = (env, argv) => {
  return  {
    entry: { main: './frontend/scripts.js'},
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: '[name]-[hash].js',
      chunkFilename: '[id]-[chunkhash].js'
    },
    devtool: "inline-source-map",
    plugins: [
      new CleanWebpackPlugin(),
      new WebpackAssetsManifest({
        writeToDisk: true,
        entrypoints: true,
        output: 'entrypoints.json',
        publicPath : 'dist/',
        assets: {}
      })
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.(js|tsx?)$/, loader: "ts-loader" },
        {
          test: /\.scss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
      ]
    }
  }
}
