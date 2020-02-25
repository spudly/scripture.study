import { MongoClient, Db } from "mongodb";
import _verses from "../data/verses.json";
import _marks from "../data/marks.json";
import { Person, MarkRange, Mark } from "../utils/types";

const { MONGO_USER, MONGO_PASSWORD } = process.env;

const getDb = async (client: MongoClient): Promise<Db> => {
  await client.connect();
  return client.db("wikimarks");
};

const PEOPLE: Array<Person> = [
  { id: "angel", name: "Angel" },
  { id: "isaiah-1", name: "Isaiah" },
  { id: "holy-ghost", name: "Holy Ghost" },
  { id: "jacob-2", name: "Jacob" },
  { id: "jesus-christ", name: "Jesus Christ / Jehovah" },
  { id: "john-the-baptist", name: "John the Baptist" },
  { id: "joseph-1", name: "Joseph" },
  { id: "laban", name: "Laban" },
  { id: "laman", name: "Laman" },
  { id: "lehi-1", name: "Lehi" },
  { id: "lemuel", name: "Lemuel" },
  { id: "nephi-1", name: "Nephi" },
  { id: "sariah", name: "Sariah" }
];

const insertPeople = async (db: Db) => {
  const collection = db.collection("people");
  const result = await collection.insertMany(PEOPLE);
  console.log(
    `inserted ${result.result.n} documents into the people collection`
  );
};

const insertMarks = async (db: Db) => {
  const collection = db.collection("marks");
  const result = await collection.insertMany(
    (_marks as Array<{
      id: string;
      type: "speaker";
      speaker: string;
      verseId: string;
      range?: MarkRange;
    }>).map(
      ({ id, type, speaker, verseId, range }): Mark => ({
        id,
        type,
        speakerId: speaker,
        verseId,
        range
      })
    )
  );
  console.log(
    `inserted ${result.result.n} documents into the marks collection`
  );
};

const getClient = () =>
  new MongoClient(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-qreww.mongodb.net/test?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  );

const go = async () => {
  const client = getClient();
  try {
    const db = await getDb(client);
    await insertMarks(db);
    await insertPeople(db);
    console.log("success");
  } catch (error) {
    console.log("FAILED!", error.stack);
  } finally {
    client.close();
  }
};

go();
