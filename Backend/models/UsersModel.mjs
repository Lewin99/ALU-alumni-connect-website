import mongoose from "mongoose";
import validator from "validator";

const { isEmail } = validator;
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "please enter password"],
    unique: true,
    validate: [isEmail, "please insert a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
  },
  role: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
