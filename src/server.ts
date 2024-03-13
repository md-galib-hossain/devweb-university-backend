import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "http";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    console.log("connected db");
    server = app.listen(config.port, () => {
      console.log(`Example app listening at http://localhost:${config.port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(`😡 unhandledRejection is detected, shutting down the server...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😡 uncaughtException is detected, shutting down the server...`);

  process.exit(1);
});

