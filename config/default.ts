import dotenv from 'dotenv';
dotenv.config();

export default {
  dbURI: `mongodb+srv://rahulraz1308:${process.env.MD_PWD}@cluster0.kjx3ptk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY
};
