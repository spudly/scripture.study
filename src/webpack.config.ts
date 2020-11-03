import path from 'path';
import {Configuration, HotModuleReplacementPlugin} from 'webpack';
// @ts-expect-error: installing types for this will cause @types/webpack to be installed, which is incompatible with webpack5
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postCssImport from 'postcss-import';
// @ts-expect-error: no typedef package available :(
import tailwindCss from 'tailwindcss';

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
  context: path.resolve(__dirname, '..'),
  devtool: 'source-map',
  entry: {
    index: [
      mode === 'development'
        ? 'webpack-hot-middleware/client?name=index.client'
        : null,
      `./src/index.client.tsx`,
    ].filter(isNotNil), // worker: './src/index.worker.ts',
  },
  mode,
  module: {
    rules: [
      {
        exclude: /node_modules/u,
        test: /\.[jt]sx?$/u,
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
        test: /\.css$/u,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                  ...(mode === 'development' ? [] : [cssnano()]),
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
  plugins,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

export default config;
