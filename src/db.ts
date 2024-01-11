
import mongoose from 'mongoose';
import mongoTestServer from './testdb';

export const connectMongo = async (): Promise<typeof mongoose> => {
  const nodeENV = process.env.NODE_ENV;
  let dbUri = process.env.DB_URL || "";

  if(nodeENV == 'test') {
    dbUri = await mongoTestServer.create()
  }

  console.log(`connecting mongo db...`);
  const db = mongoose.connection;
  db.on('error', err => {
    console.error(`error when connection mongodb ${err}`);
  });
  db.on('open', stream => {
    console.log(`connected mongo sucessfuly !`);
  });

  return mongoose.connect(dbUri);
}