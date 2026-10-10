import mangoose from "mongoose";
export async function connectToDB() {
  try {
    const conn=await mangoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:",conn.connection.host);
  } catch (error) {
    console.log(" error connecting to MongoDB", error.message);
    process.exit(1);
  }
}
