// Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.
const mongoose = require("mongoose")

//check if the caller has all necessary parameters
if (process.argv.length === 3) {
  const db_password = process.argv[2]
  console.log("db pass is ", db_password)
  mongoose.connect(
    `mongodb+srv://jhnsc62:${db_password}@cluster0.1bzvc.mongodb.net/personsApp?retryWrites=true&w=majority&appName=cluster0`
  )
  const personSchema = mongoose.Schema({
    name: String,
    phoneNumber: String,
  })
  const Person = mongoose.model("Person", personSchema)
  console.log("phonebook:")
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.phoneNumber}`)
    })
    mongoose.connection.close()
  })
} else {
  if (process.argv.length < 4) {
    console.log(
      "please enter correct number of parameters - add password, name and number"
    )
    process.exit(1)
  }

  //fetch db password and connect
  const connectDB = () => {
    //get password from command line argument
    const db_password = process.argv[2]
    mongoose.connect(
      `mongodb+srv://jhnsc62:${db_password}@cluster0.1bzvc.mongodb.net/personsApp?retryWrites=true&w=majority&appName=cluster0`
    )
  }

  //connect to the DB
  connectDB()

  //setup the person schema
  const personSchema = mongoose.Schema({
    name: String,
    phoneNumber: String,
  })

  //create a person model from schema
  const Person = mongoose.model("Person", personSchema)

  //get the user details from the command line
  const personName = process.argv[3]

  const personNumber = process.argv[4]

  const person = new Person({
    name: personName,
    phoneNumber: personNumber,
  })

  person.save().then((result) => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}
