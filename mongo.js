require("dotenv").config()
const mongoose = require("mongoose")

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("DB could not connect", error))

//setup validator functions
function validatorFunction(value) {
  return /^(?=(?:\d+-\d+){1,})(?=(?:\d{2,3}-\d+)$).{8,}$/.test(value)
}

// //custom validator and error
// const customValidatorWithErrorMessage = [
//   validatorFunction,
//   `the number does not match the required pattern.(12-123456 or 123-123456)`,
// ];

//setup the schema and add a validator function
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(?=(?:\d+-\d+){1,})(?=(?:\d{2,3}-\d+)$).{9,}$/.test(value)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
      required: [true, "User phone number is required."],
    },
  },
})

module.exports = new mongoose.model("Person", personSchema)
