//entry point --> output file
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//exporting a function could give us the env variable
module.exports = (env) => {
  const isProduction = env === "production";
  const CSSExtract = new MiniCssExtractPlugin('styles.css');

  return {
    mode: 'development',
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
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
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  }
};
