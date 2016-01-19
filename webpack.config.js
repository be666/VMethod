var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    publicPath: 'http://0.0.0.0:8082/dist/',
    filename: 'build.js'
  },
  resolve: {
    extensions: ['', '.coffee', '.js']
  },
  module: {
    //preLoaders: [{
    //  test: /\.js$/,
    //  exclude: /node_modules/,
    //  loader: 'jshint-loader'
    //}],
    loaders: [
      // 使用Babel转换ES6，排除node_modules目录下的js
      {
        test: /\.vue$/, loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  vue: {
    loaders: {}
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
  ,plugins: [commonsPlugin]
};


if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    commonsPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false
    //  }
    //}),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
