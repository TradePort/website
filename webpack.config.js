/*

# webpack config

https://webpack.js.org
https://webpack.js.org/configuration

*/

let path = require('path')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
let env = process.env.NODE_ENV
let dev = env === 'development'
let prd = env === 'production'
let entryPath = path.join(__dirname, 'src/scripts')
let outputPath = path.join(__dirname, 'dist/scripts')

if (env !== 'development') {
  env = 'production'
  prd = true
}

let options = {
  target: 'web',
  mode: env,
  entry: {
    index: path.join(entryPath, 'index.js')
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {presets: ['@babel/preset-env']}
      }
    ]
  },
  watch: false,
  cache: dev,
  performance: {
    hints: false
  },
  stats: {
    assets: false,
    colors: dev,
    errors: true,
    errorDetails: true,
    hash: false
  }
}

if (dev === true) {
  options.devtool = 'source-map'
}

if (prd === true) {
  options.optimization = {
    minimize: true,
    minimizer: [
      new UglifyjsWebpackPlugin({
        sourceMap: false,
        uglifyOptions: {
          ecma: 5,
          mangle: true,
          compress: true,
          warnings: false
        }
      })
    ]
  }
}

module.exports = options
