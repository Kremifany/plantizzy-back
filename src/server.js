require("dotenv").config();

const app = require("./app");
const connectDb = require("./db/connect");

const port = process.env.PORT ? process.env.PORT : 8000;

const listener = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app
      .listen(port, () => console.log(`Server is listening on port ${port}...`))
      .on("error", (error) => {
        console.error(
          `Server can't connect on port ${error.port}, try again later...`
        );
      });
  } catch (error) {
    console.log("This is the server port error:", error);
  }
};
listener();
