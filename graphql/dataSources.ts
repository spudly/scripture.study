import { Volume, Verse, Book, Chapter, Mark, Person } from "../utils/types";
import { Db, Collection } from "mongodb";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { InMemoryLRUCache } from "apollo-server-caching";
import DataLoader from "dataloader";

type Context = { db: Db };

const orderDocs = (ids: Array<string>) => <DOC extends { _id: string }>(
  docs: Array<DOC>
): Array<DOC> => {
  const idMap: { [id: string]: DOC } = {};
  docs.forEach(doc => {
    idMap[doc._id] = doc;
  });
  return ids.map(id => idMap[id]);
};

export const createCachingMethods = <DOC>({
  collection,
  cache
}: {
  collection: Collection;
  cache: InMemoryLRUCache;
}) => {
  const methods = {};

  return methods;
};

class MongoDataSource<DOC> extends DataSource<Context> {
  name: string;
  // @ts-ignore
  context: Context;
  // @ts-ignore
  collection: Collection;
  loader: DataLoader<string, any>;
  cachePrefix: string;
  cache: InMemoryLRUCache;

  constructor(name: string) {
    super();
    this.name = name;
    this.cache = new InMemoryLRUCache();
    this.loader = new DataLoader((ids: Array<string>) =>
      this.collection
        .find({ _id: { $in: ids } })
        .toArray()
        .then(orderDocs(ids))
    );
    this.cachePrefix = `mongo-${name}-`;
  }

  initialize({ context }: DataSourceConfig<Context>) {
    this.context = context;
    const { db } = context;
    const collection = db.collection(this.name);
    this.collection = collection;
  }

  async findOneById(id: string, { ttl }: { ttl?: number } = {}): Promise<DOC> {
    const key = this.cachePrefix + id;

    const cacheDoc = await this.cache.get(key);
    if (cacheDoc) {
      return JSON.parse(cacheDoc);
    }

    const doc = await this.loader.load(id);
    if (ttl != null) {
      // https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-caching#apollo-server-caching
      this.cache.set(key, JSON.stringify(doc), { ttl });
    }

    return doc;
  }

  async findManyByIds(
    ids: Array<string>,
    { ttl }: { ttl?: number } = {}
  ): Promise<DOC[]> {
    return Promise.all(ids.map(id => this.findOneById(id, { ttl })));
  }

  deleteFromCacheById(id: string) {
    this.cache.delete(this.cachePrefix + id);
  }
}

class VolumesDataSource extends MongoDataSource<Volume> {}

class BooksDataSource extends MongoDataSource<Book> {
  async getAllByVolumeId(volumeId: string): Promise<Book[]> {
    return this.collection.find({ volumeId }).toArray();
  }
}

class ChaptersDataSource extends MongoDataSource<Chapter> {
  async getAllByBookId(bookId: string): Promise<Chapter[]> {
    return this.collection.find({ bookId }).toArray();
  }
}

class VersesDataSource extends MongoDataSource<Verse> {
  async getAllByChapterId(chapterId: string): Promise<Verse[]> {
    return this.collection.find({ chapterId }).toArray();
  }
}

class PeopleDataSource extends MongoDataSource<Person> {}

class MarksDataSource extends MongoDataSource<Mark> {
  async getAllBySpeakerId(speakerId: string): Promise<Mark[]> {
    return this.collection.find({ speakerId }).toArray();
  }
}

const getDataSources = () => ({
  volumes: new VolumesDataSource("volumes"),
  books: new BooksDataSource("books"),
  chapters: new ChaptersDataSource("chapters"),
  verses: new VersesDataSource("verses"),
  people: new PeopleDataSource("people"),
  marks: new MarksDataSource("marks")
});

export default getDataSources;
