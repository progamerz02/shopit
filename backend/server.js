const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to uncaught exceptions");
  process.exit(1);
});

dotenv.config({ path: "backend/config/.env" });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//Handle Unhandled Promise rejections
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to unhandled promis rejection");
  server.close(() => {
    process.exit(1);
  });
});
