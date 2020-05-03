import {MongoClient, Db} from 'mongodb';

const {MONGO_USER, MONGO_PASSWORD} = process.env;

const getConnection = async () => {
  const mongoClient = new MongoClient(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-qreww.mongodb.net/test?retryWrites=true&w=majority`,
    {useUnifiedTopology: true},
  );
  await mongoClient.connect();
  return mongoClient.db('wikimarks');
};

let _promise: Promise<Db>;
const memoizedGetConnection = async () => {
  if (!_promise) {
    _promise = getConnection();
  }
  return _promise;
};

console.log('Warming up connection pool...');
memoizedGetConnection().then(() => console.log('connection pool warmed up'));

export default memoizedGetConnection;
