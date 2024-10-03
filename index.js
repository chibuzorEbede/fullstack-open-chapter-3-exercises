const express = require('express')
const utils = require('./utils')
const  morgan = require('morgan')

//setup the persons array
let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  },
  {
    "id": "5",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

//initialize app
const app = express()

//add json parser middleware
app.use(express.json())

//create morgan token
morgan.token('postData',function(req,res){return [req.headers['content-length'],JSON.stringify(req.body)].join(' ')})


//add morgan middleware
app.use(morgan(' :method :url :status - :response-time ms :postData '))


//CREATE API ENDPOINTS

//get all phonebook entries
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//get a single person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  //check if person exists
  const person = persons.find((p) => p.id === id)
  if (!person) {
    return response.status(404).json({ "error": "person not found" })
  }
  response.json(person)
})

//delete a person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  const person = persons.filter((p) => p.id === id)

  if (!person || person.length === 0) {
    return response.status(404).json({ "error": "person not found" })
  }
  //update persons array
  persons = persons.filter((p) => p.id !== id)
  response.json(person)
})

//create a person
app.post('/api/persons/',(request,response)=>{
  //get the reuest body and 
  const body  = request.body

  //check if the post body is valid
  if(!body.name || !body.number){
    return response.json({"error": "name or number is missing."})
  }

  //check if name already exists
  const existingName = persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())
  if(existingName){
    return response.status(409).json({"error": "name must be unique"})
  }

  //build the user details
  const id  = utils.generateId() //get the user id from the utils package
  const person = {
    id: id,
    name: body.name,
    number: body.number
  }
  //update the persons array
  persons = persons.concat(person)

  //return a json response
  response.json(person)
})

//endpoint for the info page
app.get('/info', (request, response) => {
  const phonebookCount = persons.length
  const requestTimeStamp = Date().toString()
  response.send(`
    <p>Phonebook has info for ${phonebookCount} people.</p> 
    <p>${requestTimeStamp}</p> 
    `)
})




//set port
const PORT = 3001

//start the server and connect to the port
app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`)
})