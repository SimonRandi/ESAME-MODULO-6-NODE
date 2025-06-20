const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: String,
  text: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      max: 20,
    },
    title: {
      type: String,
      required: true,
      max: 100,
    },
    cover: {
      type: String,
      default: "https://picsum.photos/200/200",
    },
    readTime: {
      value: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: 0,
      },
      unit: {
        type: String,
        enum: ["sec", "min"],
        default: "min",
      },
    },

    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("post", PostSchema, "posts");
