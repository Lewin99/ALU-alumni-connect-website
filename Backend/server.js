import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import eventsRouter from "./routes/eventRoutes.mjs";
import usersRoutes from "./routes/userRoutes.mjs";
import registeredRouter from "./routes/registeredRoutes.mjs";
import cors from "cors";

dotenv.config();
const conString = process.env.Db_connect;

(async () => {
  try {
    await mongoose.connect(conString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful");
  } catch (error) {
    console.error("Connection error:", error);
  }
})();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/events", eventsRouter);
app.use("/api/registered", registeredRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
