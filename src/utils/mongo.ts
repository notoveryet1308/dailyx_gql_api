import config from 'config';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export async function connectToMongoDB() {
  try {
    await mongoose.connect(config.get('dbURI'), );
    console.log(`connected to mongodb database`);
  } catch (error) {
    console.error(error);
    process.exit();
  }
}
