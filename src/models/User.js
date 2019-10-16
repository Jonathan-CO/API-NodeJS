const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true // remove espaços do início e fim da string
    },
    sex: {
        type: String,
        required: true,
        trim: true
    },
    birthdate:{
        type: Date,
        required: true
    },
    tel:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        type: String,
        required: true,
        trim: true
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    tags:[{
        type: String,
        required: true,
        trim: true
    }]
})

module.exports = mongoose.model('User', schema)