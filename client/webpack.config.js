const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Add and configure workbox plugins for a service worker and manifest file.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  }
}

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    }),
    new WebpackPwaManifest({
      name: 'TODOs',
      short_name: 'TODOs',
      description: 'Keep track of important tasks!',
      background_color: '#7eb4e2',
      theme_color: '#7eb4e2',
      start_url: './',

     //TODO: Check these routes and values as they were copied
      icons: [
        {
          src: path.resolve('client/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
     ],
    }),
 ];

// Add CSS loaders and babel to webpack.
module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',//package.json babel-loader
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
};
