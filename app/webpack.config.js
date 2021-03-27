const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = (env, argv) => {
  return  {
    entry: { main: './frontend/scripts.js'},
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: '[contenthash].bundle.js',
    },
    devtool: "inline-source-map",
    plugins: [
      new CleanWebpackPlugin(),
      new WebpackManifestPlugin({
        writeToFileEmit: true,
        fileName: 'entrypoints.json'
      })
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.(js|tsx?)$/, loader: "ts-loader" }
      ]
    }
  }
}
