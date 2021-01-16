const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { jsonBeautify } = require('beautify-json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer({})],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: { loader: 'file-loader' },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: 'favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].bundle.css',
      chunkFilename: '[id].css',
    }),
  ],
};

module.exports = (_, argv) => {
  config.mode = argv.mode;
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer = {
      compress: true,
      hot: true,
      contentBase: './build',
      historyApiFallback: true,
    };
  }

  if (argv.mode === 'production') {
    config.entry = ['./src'];
    config.devtool = 'source-map';
    config.output.filename = '[name].[chunkhash].bundle.js';
    config.output.chunkFilename = '[name].[chunkhash].bundle.js';
    config.optimization = {
      minimize: true,
      moduleIds: 'deterministic',
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules\/(?!antd\/).*/,
            name: 'vendors',
            chunks: 'all',
          },
          antd: {
            test: /node_modules\/(antd\/).*/,
            name: 'antd',
            chunks: 'all',
          },
        },
      },
    };
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
      })
    );
    config.performance = {
      hints: 'warning',
      assetFilter(assetFilename) {
        return assetFilename.endsWith('.js.gz');
      },
    };
  }
  jsonBeautify(config);
  return config;
};
