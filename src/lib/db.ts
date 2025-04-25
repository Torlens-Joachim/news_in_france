import mongoose from "mongoose";

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
  throw new Error('CONNECTION_STRING is not defined in the environment variables');
}

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected 🥳'))
  .catch((err) => console.error(err));