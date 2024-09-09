import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now,  // Sets the default value to the current date and time when the user is created
  },
});

const User = mongoose.model("User", userSchema);
export default User;
