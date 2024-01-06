
import mongoose from 'mongoose';

export const connectMongo = (): Promise<typeof mongoose> => {
  console.log(`connecting mongo db...`);
  const db = mongoose.connection;
  db.on('error', err => {
    console.error(`error when connection mongodb ${err}`);
  });
  db.on('open', stream => {
    console.log(`connected mongo sucessfuly !`);
  });

  return mongoose.connect(process.env.DB_URL || "");
}