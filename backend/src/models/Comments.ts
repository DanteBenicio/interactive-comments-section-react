import mongoose from "mongoose";

const Replies = new mongoose.Schema({
  id: Number,
  content: String,
  createdAt: String,
  replyingTo: String,
  score: Number,
  user: {
    image: {
      png: String,
      webp: String
    },
    username: String
  },
  you: Boolean
})

const commentSchema = new mongoose.Schema({
  id: Number,
  content: String,
  createdAt: String,
  score: Number,
  user: {
    image: {
      png: String,
      webp: String
    },
    username: String
  },
  replies: [Replies]
});

export const Comments = mongoose.model('Comment', commentSchema);
