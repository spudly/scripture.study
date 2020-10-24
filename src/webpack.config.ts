import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {Configuration, HotModuleReplacementPlugin} from 'webpack';
import purgeCss from '@fullhuman/postcss-purgecss';
import postCssImport from 'postcss-import';
// @ts-expect-error: need to install types
import tailwindCss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const mode: 'production' | 'development' =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const isNotNil = <T>(val: T | null | undefined): val is NonNullable<T> =>
  val != null;

const plugins = [];
if (mode === 'development') {
  plugins.push(new HotModuleReplacementPlugin());
  plugins.push(new ReactRefreshWebpackPlugin());
}

const config: Configuration = {
  entry: {
    'index.client': [
      mode === 'development'
        ? 'webpack-hot-middleware/client?name=index.client'
        : null,
      `./${
        process.env.NODE_ENV === 'test' ? '.src-instrumented' : 'src'
      }/index.client.tsx`,
    ].filter(isNotNil),
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
                        defaultExtractor: (
                          /** @type {string} */ content: any,
                        ) => content.match(/[\w-/:]+(?<!:)/g) || [],
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

export default config;
