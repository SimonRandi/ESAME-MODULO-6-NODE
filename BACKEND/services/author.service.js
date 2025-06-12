const authorSchema = require("../models/authorSchema");
const bcrypt = require("bcrypt");
const findAll = async (page, pageSize, field, order) => {
  const authors = await authorSchema
    .find()
    .sort({
      [field]: order === "desc" ? -1 : 1,
    })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("posts", "title")
    .populate("address", "city cap");

  const totalAuthors = await authorSchema.countDocuments();
  const totalPages = Math.ceil(totalAuthors / pageSize);

  return {
    page,
    pageSize,
    totalAuthors,
    totalPages,
    authors,
  };
};

const findById = async (id) => {
  return authorSchema.findById(id);
};

const createAuthor = async (body) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const newAuthor = new authorSchema({
    ...body,
    password: hashedPassword,
  });

  const authorToSave = await newAuthor.save();

  return {
    authorToSave,
  };
};

const update = async (payload, id) => {
  const option = { new: true };
  return authorSchema.findByIdAndUpdate(id, payload, option);
};

const updateAvatar = async (id, payload) => {
  const option = { new: true };
  return authorSchema.findByIdAndUpdate(id, payload, option);
};

const deleteAuthors = async (id) => {
  return await authorSchema.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  createAuthor,
  update,
  deleteAuthors,
  findById,
  updateAvatar,
};
