import mongoose, { connect } from "mongoose";

const ConnectDB = async (req, res) => {
  try {
    await mongoose
      .connect(process.env.MongoDBURI)
      .then((data) => console.log(`connect with ${data.connection.host}`));
  } catch (error) {
    console.error(error.message);
  }
};
export default ConnectDB;
