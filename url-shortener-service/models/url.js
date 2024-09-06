import mongoose from "mongoose";

const schema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortenedUrl: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  createdAt: { type: Date, default: Date.now },
})

const Url = mongoose.model('Url', schema);
export default Url;
