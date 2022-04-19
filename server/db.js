import mongoose from "mongoose";

export const connection = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(process.env.DATABASE_URL, connectionParams)
    .then(() => {
      console.log("Connected successfully to database");
    })
    .catch((error) => {
      console.log("Couldn't connect to database:");
      console.log(error);
    });
};
