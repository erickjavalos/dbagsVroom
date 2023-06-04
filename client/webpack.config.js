const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build"),
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
        }),
    ],
    devServer: {
        static: {
        directory: path.join(__dirname, "build"),
        },
        port: 3000,
    },
    module: {
        // exclude node_modules
        rules: [
          {
            test: /\.(js|jsx)$/,         // <-- added `|jsx` here
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
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
      // pass all js files through Babel
      resolve: {
        extensions: ["*", ".js", ".jsx"],    // <-- added `.jsx` here
    },
    // to work with lucid-cardano
    experiments: {
        "asyncWebAssembly": true,
        "topLevelAwait": true,
        "layers": true // optional, with some bundlers/frameworks it doesn't work without
    }
  
};