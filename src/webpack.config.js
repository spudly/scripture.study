const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const purgeCss = require('@fullhuman/postcss-purgecss');
const postCssImport = require('postcss-import');
const tailwindCss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const plugins = [];
if (mode === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new ReactRefreshWebpackPlugin());
}

/** @type {import("webpack").Configuration} */
const config = {
  entry: {
    'index.client': [
      'webpack-hot-middleware/client?name=index.client',
      './src/index.client.tsx',
    ],
    'index.client.sw': [
      'webpack-hot-middleware/client?name=index.client.sw',
      './src/index.client.sw.ts',
    ],
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, '../public'),
  },
  mode,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                postCssImport,
                tailwindCss,
                autoprefixer,
                ...(mode === 'production'
                  ? [
                      purgeCss({
                        content: ['./**/*.tsx', './**/*.html'],
                        defaultExtractor: (/** @type {string} */ content) =>
                          content.match(/[\w-/:]+(?<!:)/g) || [],
                      }),
                    ]
                  : []),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins,
};

module.exports = config;
