import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// Middleware setup
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);

// Database connection setup
const MONGO_URI = "mongodb+srv://shavinda:OUTgdL8UoAwDGKLv@cluster0.5u2aprx.mongodb.net/?retryWrites=true";
mongoose.connect(MONGO_URI, { dbName: "RESERVATIONS" })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(`Some error occurred while connecting to database: ${err}`);
  });
  app.use(errorMiddleware);
export default app;
