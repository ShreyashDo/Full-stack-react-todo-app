const express = require('express'); // to handle the api
const mongoose = require('mongoose'); // to handle the database
const cors = require('cors');

const app = express(); // express as a function

app.use(express.json()); // allows to use content type app from json inside api 
app.use(cors()); // stop cross origin errors

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', (req, res) => { // new todos
    const todo = new Todo({
        text: req.body.text  // text is the only req field, req.body- anything we send to the rest req, we will get the text  
    });

    todo.save();  // saves todo to our collection

    res.json(todo); // pass us back our new todo to add to the list

});                                 // creates new toto or root inside our Mongo db, colleection

app.delete('/todo/delete/:id', async (req, res) => { // to delete the root
    const result = await Todo.findByIdAndDelete(req.params.id); //find ID and Delete function

    res.json(result);
})

app.get('/todo/complete/:id', async (req, res) => { //toggle completing our todo
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete; 
    todo.save(); 
    res.json(todo); // pass back new todo
})

app.listen(3001, () => console.log("Server started on port 3001"));
