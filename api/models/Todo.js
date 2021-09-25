const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now() //current timestring in a todo
    }
})

const Todo = mongoose.model("Todo", TodoSchema); // Actually creating a model (Name, schema)

module.exports = Todo; // Now the model can be imported to the server js