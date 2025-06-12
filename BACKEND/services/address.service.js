const AddressSchema = require("../models/addressSchema");
const AuthorSchema = require("../models/authorSchema");

const findAll = async () => {
  return await AddressSchema.find();
};

const createAddress = async (address, id) => {
  const author = await AuthorSchema.findOne({ _id: id });
  const newAddress = new AddressSchema(address);
  const addressToSave = await newAddress.save();

  console.log(author);

  await AuthorSchema.updateOne(
    { _id: author._id },
    { $push: { address: addressToSave } }
  );

  return addressToSave;
};

module.exports = {
  findAll,
  createAddress,
};
