const express = require('express')

//setup the persons array
const persons = [
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
    }
]

//initialize app
const app = express()

//add json parser middleware
app.use(express.json())

//CREATE API ENDPOINTS

//get all phonebook entries
app.get('/api/persons',(request,response)=>{
    console.log(request.url)
    response.json(persons)
})

//set port
const PORT = 3001

//start the server
app.listen(PORT,()=>{
    console.log(`app started on port ${PORT}`)
})