import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI!
    );
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to mongo");
    });
    connection.on("error", (err) => {
      console.log("error", err);
      process.exit();
    });
  } catch (err) {
    console.log(err);
  }
}
