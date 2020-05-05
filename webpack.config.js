const path = require('path');

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

/** @type {typeof import("webpack").Configuration} */
const config = {
  entry: './index.client.tsx',
  output: {
    filename: 'index.client.js',
    path: path.resolve(__dirname, 'public'),
  },
  mode,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            noEmit: false,
            module: 'esnext',
          },
        },
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
                require('postcss-import'),
                require('tailwindcss'),
                require('autoprefixer'),
                ...(mode === 'production'
                  ? [
                      require('@fullhuman/postcss-purgecss')({
                        content: ['./src/**/*.tsx'],
                        defaultExtractor: (content) =>
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
};

module.exports = config;
