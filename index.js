const express = require("express");
const utils = require("./utils");
const morgan = require("morgan");
const cors = require("cors");

//import the person model
const Person = require("./mongo.js");

//initialize app
const app = express();

//add static files
app.use(express.static("frontend"));

//use cors
app.use(cors());

//add json parser middleware
app.use(express.json());

//create morgan token
morgan.token("postData", function (req, res) {
  return [req.headers["content-length"], JSON.stringify(req.body)].join(" ");
});

//add morgan middleware
app.use(morgan(" :method :url :status - :response-time ms :postData "));

//create error handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error);
  if (error.name === "CastError") {
    console.log(`the error's name is ${error.name}`);
    return response.status(401).json({ error: error });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error });
  } else {
    return response.status(500).json({ error: error });
  }

  next(error);
};

//CREATE API ENDPOINTS

//api home
app.get("/", (req, res) => {
  res.json({ message: "welcome to the phonebook api" });
});

//get all phonebook entries
app.get("/api/persons", async (request, response, next) => {
  try {
    const result = await Person.find({});
    if (!result) {
      response.json({ error: "no persons found." });
    }
    response.json(result);
  } catch (error) {
    next(error);
  }
});

//get a single person
app.get("/api/persons/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    //check if person exists
    const result = await Person.findById(id);
    if (!result) {
      return response.status(404).json({ error: "person not found" });
    }
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//delete a person
app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const result = await Person.findByIdAndDelete(id);

    if (!result) {
      return response
        .status(404)
        .json({ error: "Could not delete. Person not found" });
    }
    response.status(204).json(result);
  } catch (error) {
    next(error);
  }
});

//create a person
app.post("/api/persons/", async (request, response, next) => {
  try {
    //get the request body and parse it
    const body = request.body;

    //check if the post body is valid
    if (!body.name || !body.number) {
      return response.json({ error: "name or number is missing." });
    }

    //build the user details

    const person = {
      name: body.name,
      phoneNumber: body.number,
    };
    const result = await new Person(person).save();

    if (!result) {
      response.json({ error: "new person could not be saved." });
    }
    //return a json response
    response.json(result);
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const filter = {
      name: id,
    };
    const update = {
      phoneNumber: request.body.number,
    };
    const updatedPerson = await Person.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!updatedPerson) {
      return response.status(404).json({ error: "person not found" });
    }
    return response
      .status(200)
      .json({ successful: "user updated", data: updatedPerson });
  } catch (error) {
    next(error);
  }
});

//endpoint for the info page
app.get("/info", async (request, response, next) => {
  try {
    const phonebookCount = await Person.find();
    const requestTimeStamp = Date().toString();
    response.send(`
    <p>Phonebook has info for ${phonebookCount.length} people.</p> 
    <p>${requestTimeStamp}</p> 
    `);
  } catch (error) {
    next(error);
  }
});

//use the error handler middleware
app.use(errorHandler);

//set port
const PORT = process.env.PORT || 3001;

//start the server and connect to the port
app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
