import mongoose from "mongoose";
import { type } from "os";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter Username"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email Address"],
      unique: [true, "Email Address Already Taken"],
    },
    password: {
      type: String,
      required: [true, "Please Enter the Password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    resetPasswordOtp: { type: String },
    resetPasswordOtpExpires: { type: Date },
    eventsAttended: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
