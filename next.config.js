module.exports = {
  env: {
    ROOT: __dirname
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      use: [
        {
          loader: "graphql-tag/loader"
        }
      ]
    });
    return config;
  }
};
