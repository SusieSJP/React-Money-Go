//entry point --> output file
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

require('dotenv').config({ path: '.env.development' });

//exporting a function could give us the env variable
module.exports = (env) => {
  const isProduction = env === "production";

  return {
    mode: 'development',
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public','dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node.modules/
      }, {
          test: /\.s?css$/,
          use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: (resourcePath, context) => {
                    return path.relative(path.dirname(resourcePath),context) + '/';
                  }
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEAUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEAUREMENT_ID),
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  }
};
