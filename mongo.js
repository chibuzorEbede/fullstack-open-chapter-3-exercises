require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("DB could not connect", err));

//setup the schema
const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

module.exports = new mongoose.model("Person", personSchema);
