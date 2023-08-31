
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



const REMOTE_URL = process.env.REMOTE_URL || 'http://localhost:3001/';


module.exports = {
  entry: path.resolve(__dirname, './src/App.js'),
  module: {
    rules: [
    
      {
        test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": {
                    "node": "12"
                  }
                }],
                '@babel/preset-react'
              ]
            }
          }]
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name : 'assets/img/[name].[contenthash].[ext]'
                }
            }
        ]
      }
    
    
    ],
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  experiments: {
    syncWebAssembly: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(), 
],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
    historyApiFallback: true,
    publicPath: '/', 
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
           target: 'http://localhost:3000',
           router: () => 'http://localhost:3001',
           logLevel: 'debug' /*optional*/
      }
   }

    
  },
};
