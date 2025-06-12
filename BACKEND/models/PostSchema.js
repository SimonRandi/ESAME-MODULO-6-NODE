const mongoose = require("mongoose");

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
      default: "https://lorem.picsum/200/200",
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
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("post", PostSchema, "posts");
