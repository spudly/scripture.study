module.exports = {
  client: {
    includes: ["./graphql/**/*.ts"],
    service: {
      localSchemaFile: "./graphql/schema.graphql"
    }
  }
};
