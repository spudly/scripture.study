const path = require('path');

module.exports = {
  entry: './src/index.client.tsx',
  output: {
    filename: 'public/index.client.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
                ...(process.env.NODE_ENV !== 'development'
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
