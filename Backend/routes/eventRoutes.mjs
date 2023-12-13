import express from "express";
import {
  createEvent,
  listAllEvents,
  listEventsByOrganizer,
  deleteEventById,
  updateEventById,
} from "../controllers/eventControllers.mjs";

const eventsRouter = express.Router();
eventsRouter.get("/", listAllEvents);
eventsRouter.post("/", createEvent);
eventsRouter.get("/byorganizer", listEventsByOrganizer);
eventsRouter.put("/:id", updateEventById);
eventsRouter.delete("/:id", deleteEventById);

export default eventsRouter;
