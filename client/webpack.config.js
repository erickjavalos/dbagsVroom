
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
    
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],},
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name : 'assets/img/[name].[ext]'
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
  plugins: [new webpack.HotModuleReplacementPlugin(), 
],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
    historyApiFallback: true,
    publicPath: '/', 
    port: 3000,
    host: '0.0.0.0',
      disableHostCheck: true,
    
  },
};
