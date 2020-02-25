declare module "apollo-datasource-mongodb" {
  import { DataSource } from "apollo-datasource";
  import { Collection } from "mongodb";

  class MongoDataSource<DOC> extends DataSource {
    constructor(collection: Collection);
    collection: Collection;
    findOneById(id: string, opts?: { ttl: number }): Promise<DOC>;
    findManyByIds(id: string, opts?: { ttl: number }): Promise<DOC>;
    deleteFromCacheById(id: string): Promise<void>;
  }
  export { MongoDataSource };
}
