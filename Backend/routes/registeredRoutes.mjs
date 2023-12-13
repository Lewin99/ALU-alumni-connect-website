import express from "express";
import {
  registerForEvent,
  getRegisteredEventsForUser,
  deleteRegisteredEvent,
} from "../controllers/registeredControllers.mjs";

const registeredRouter = express.Router();
registeredRouter.post("/", registerForEvent);
registeredRouter.get("/", getRegisteredEventsForUser);
registeredRouter.delete("/:eventId", deleteRegisteredEvent);

export default registeredRouter;
