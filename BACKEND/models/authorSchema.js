const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://lorem.picsum/50/50",
    },

    password: {
      type: String,
      required: true,
      min: 8,
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        default: [],
      },
    ],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("author", AuthorSchema, "authors");
