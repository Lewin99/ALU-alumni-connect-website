import dotenv from "dotenv";
import RegisteredModel from "../models/registeredModel.mjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UsersModel.mjs";

dotenv.config();
const Secret_Key = process.env.ACCESS_TOKEN_SECRET_key;

export const registerForEvent = async (req, res) => {
  try {
    const { title, description, category, date, location, timeFrom, timeTo } =
      req.body;

    const token = req.cookies.token;
    const decoded = jwt.verify(token, Secret_Key);
    const userId = decoded.userId;

    const existingRegistration = await RegisteredModel.findOne({
      title,
      register: userId,
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "User has already registered for this event",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const registeredEvent = new RegisteredModel({
      title,
      description,
      category,
      date,
      location,
      timeFrom,
      timeTo,
      register: userId,
    });

    const savedEvent = await registeredEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({
      message: "Error registering for the event",
      error: error.message,
    });
  }
};

export const getRegisteredEventsForUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, Secret_Key);
    const userId = decoded.userId;

    const registeredEvents = await RegisteredModel.find({ register: userId });

    res.status(200).json(registeredEvents);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching registered events",
      error: error.message,
    });
  }
};

export const deleteRegisteredEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const deletedEvent = await RegisteredModel.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the event",
      error: error.message,
    });
  }
};
