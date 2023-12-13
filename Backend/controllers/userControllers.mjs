import UserModel from "../models/UsersModel.mjs";
import { saveuserErrorHandler } from "../middlewares/errorhandler.mjs";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const Acess_Token_Secret_Key = process.env.ACCESS_TOKEN_SECRET_key;

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password, role } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(password, salt);
    const user = new UserModel({
      firstname,
      lastname,
      email,
      username,
      password: hashedpass,
      role,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    const era = saveuserErrorHandler(error);
    res.status(500).json(era);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const listAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { firstname, lastname, username, email, password } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      id,
      { firstname, lastname, username, email },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User updated successfully", user });
    }
  } catch (error) {
    res.status(500).json({ error: "User update failed" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "User deletion failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "no user" });
    }

    const loginuser = await UserModel.findOne({ email });

    if (!loginuser) {
      return res.status(401).json({ error: "No user found in the database" });
    }

    const match = await bcrypt.compare(password.trim(), loginuser.password);

    if (match) {
      const expiresIn = Date.now() + 24 * 60 * 60 * 1000;
      const Access_token = jwt.sign(
        { userId: loginuser._id, email: loginuser.email, role: loginuser.role },
        Acess_Token_Secret_Key,
        { expiresIn: `${expiresIn}s` }
      );
      res.cookie("token", Access_token, { httpOnly: true });
      res.status(200).json({
        message: "Login successful",
        Access_token,
        expiresIn,
        role: loginuser.role,
      });
    } else {
      console.log("Password does not match");
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
