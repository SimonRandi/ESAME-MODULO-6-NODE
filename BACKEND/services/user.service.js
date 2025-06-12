const userSchema = require("../models/UserSchema");

const findAll = async (page, pageSize, field, order) => {
  const users = await userSchema
    .find()
    .sort({
      [field]: order === "desc" ? -1 : 1,
    })
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  const totalUsers = await userSchema.countDocuments();
  const totalPages = Math.ceil(totalUsers / pageSize);

  return {
    page,
    pageSize,
    totalPages,
    totalUsers,
    users,
  };
};

const findUserById = async (id) => {
  return userSchema.findById(id);
};

const createUser = async (body) => {
  const newUser = new userSchema({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });

  const userToSave = await newUser.save();

  return {
    userToSave,
  };
};

const updateUser = async (payload, id) => {
  const option = { new: true };
  return userSchema.findByIdAndUpdate(id, payload, option);
};

const deleteUser = async (id) => {
  return await userSchema.findByIdAndDelete(id);
};

module.exports = { findAll, createUser, deleteUser, updateUser, findUserById };
