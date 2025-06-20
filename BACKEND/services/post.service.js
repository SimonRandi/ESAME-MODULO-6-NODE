const postSchema = require("../models/PostSchema");
const author = require("../models/authorSchema");
const postNotFoundException = require("../exceptions/post/postNotFoundException");

const findAll = async (page, pageSize, field, order) => {
  const posts = await postSchema
    .find()
    .sort({
      [field]: order === "desc" ? -1 : 1,
    })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("author", "name");

  const totalPosts = await postSchema.countDocuments();
  const totalPages = Math.ceil(totalPosts / pageSize);

  return {
    page,
    pageSize,
    totalPages,
    totalPosts,
    posts,
  };
};

const findPostById = async (id) => {
  return postSchema.findById(id);
};

const findByCategory = async (category) => {
  return postSchema.find({
    category: {
      $regex: category,
      $options: "i",
    },
  });
};

const createPost = async (body, authorId) => {
  const findAuthor = await author.findOne({ _id: authorId });
  const newPost = new postSchema(body);

  const postToSave = await newPost.save();
  const populatedPost = await postToSave.populate("author");

  await author.findByIdAndUpdate(authorId, { $push: { posts: newPost } });

  return {
    postToSave,
  };
};

const deletePost = async (id) => {
  console.log("id rivcevuto", id);
  const postToDelete = await postSchema.findByIdAndDelete(id);

  if (!postToDelete) {
    throw new postNotFoundException();
  }

  await author.findByIdAndUpdate(postToDelete.author, {
    $pull: { posts: id },
  });

  return {
    statusCode: 200,
    message: "post deleted",
  };
};

const updatePost = async (payload, id) => {
  const option = { new: true };
  return postSchema.findByIdAndUpdate(id, payload, option);
};

const updateCover = async (payload, id) => {
  const option = { new: true };

  return postSchema.findByIdAndUpdate(payload, id, option);
};

const addComment = async (id, comment) => {
  const post = await postSchema.findById(id);
  if (!post) {
    throw new postNotFoundException();
  }
  post.comments.push(comment);
  await post.save();
  return post;
};

module.exports = {
  findAll,
  findPostById,
  createPost,
  deletePost,
  updatePost,
  updateCover,
  findByCategory,
  addComment,
};
