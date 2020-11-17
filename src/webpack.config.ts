import path from 'path';
import {Configuration, DefinePlugin, HotModuleReplacementPlugin} from 'webpack';
// @ts-expect-error: installing types for this will cause @types/webpack to be installed, which is incompatible with webpack5
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postCssImport from 'postcss-import';
// @ts-expect-error: no typedef package available :(
import tailwindCss from 'tailwindcss';
import './utils/globals';

const isNotNil = <T>(val: T | null | undefined): val is NonNullable<T> =>
  val != null;

const config: Configuration = {
  context: path.resolve(__dirname, '..'),
  devtool: 'source-map',
  entry: {
    index: [
      !IS_PROD ? 'webpack-hot-middleware/client?name=index.client' : null,
      `./src/index.client.tsx`,
    ].filter(isNotNil),
  },
  mode: !IS_PROD ? 'production' : 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/u,
        test: /\.[jt]sx?$/u,
        use: [
          {
            loader: 'babel-loader',
            options: IS_TEST
              ? {
                  plugins: ['istanbul'],
                }
              : undefined,
          },
        ],
      },
      {
        test: /\.css$/u,
        use: [
          !IS_PROD ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postCssImport,
                  tailwindCss,
                  autoprefixer,
                  ...(IS_PROD ? [cssnano()] : []),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    chunkFilename: 'js/[name].js',
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
  },
  plugins: [
    ...(IS_PROD
      ? [
          new MiniCssExtractPlugin({
            filename: 'css/[name].css',
          }),
        ]
      : [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()]),
    new DefinePlugin({
      IS_DEV,
      IS_PROD,
      IS_TEST,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

export default config;
