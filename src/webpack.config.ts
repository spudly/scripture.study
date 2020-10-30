import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {Configuration, HotModuleReplacementPlugin} from 'webpack';
import postCssImport from 'postcss-import';
// @ts-expect-error: no typedef package available :(
import tailwindCss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// @ts-expect-error: installing types for this will cause @types/webpack to be installed, which is incompatible with webpack5
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import cssnano from 'cssnano';

const mode: 'production' | 'development' =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const isNotNil = <T>(val: T | null | undefined): val is NonNullable<T> =>
  val != null;

const plugins = [];
if (mode === 'development') {
  plugins.push(new HotModuleReplacementPlugin());
  plugins.push(new ReactRefreshWebpackPlugin());
} else {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  );
}

const config: Configuration = {
  entry: {
    index: [
      mode === 'development'
        ? 'webpack-hot-middleware/client?name=index.client'
        : null,
      `./src/index.client.tsx`,
    ].filter(isNotNil),
    // worker: './src/index.worker.ts',
  },
  context: path.resolve(__dirname, '..'),
  devtool: 'source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
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
            options:
              process.env.NODE_ENV === 'test'
                ? {
                    plugins: ['istanbul'],
                  }
                : undefined,
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {importLoaders: 1}},
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postCssImport,
                  tailwindCss,
                  autoprefixer,
                  ...(mode === 'development' ? [] : [cssnano()]),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins,
};

export default config;
